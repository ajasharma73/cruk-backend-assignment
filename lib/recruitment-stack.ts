import {
  CfnOutput,
  Duration,
  RemovalPolicy,
  Stack,
  StackProps,
  Token
} from 'aws-cdk-lib';
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  Peer,
  Port,
  SecurityGroup,
  SubnetType,
  Vpc
} from 'aws-cdk-lib/aws-ec2';
import { Code, DockerImageCode } from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import {
  Credentials,
  DatabaseInstance,
  DatabaseInstanceEngine,
  MysqlEngineVersion
} from 'aws-cdk-lib/aws-rds';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { DonationFunctionDeploy } from './donation-fn-deploy';
import {
  DATABASE_NAME,
  DATABASE_SECRET_NAME,
  SECURITY_GROUP,
  VPC_NAME
} from './env';
import { CdkResourceInitializer } from './resource-initialiser';

export class RecruitmentStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const engine = DatabaseInstanceEngine.mysql({
      version: MysqlEngineVersion.VER_8_0
    });
    const instanceType = InstanceType.of(InstanceClass.T3, InstanceSize.MICRO);
    const port = 3306;
    const dbName = DATABASE_NAME;
    const credsSecretName = DATABASE_SECRET_NAME;

    const masterUserSecret = new Secret(this, credsSecretName, {
      secretName: credsSecretName,
      description: 'Database master user credentials',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: 'admin' }),
        generateStringKey: 'password',
        passwordLength: 32,
        excludePunctuation: true
      }
    });

    const vpc = new Vpc(this, VPC_NAME, {
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'ingress',
          subnetType: SubnetType.PUBLIC
        }
      ]
    });

    const dbSecurityGroup = new SecurityGroup(this, SECURITY_GROUP, {
      securityGroupName: SECURITY_GROUP,
      vpc: vpc
    });

    dbSecurityGroup.addIngressRule(
      Peer.anyIpv4(),
      Port.tcp(port),
      `Allow port ${port} for database access from VPC CIDR block`
    );

    const dbInstance = new DatabaseInstance(this, 'MysqlRdsInstance', {
      vpc: vpc,
      vpcSubnets: { subnetType: SubnetType.PUBLIC },
      instanceType,
      engine,
      port,
      securityGroups: [dbSecurityGroup],
      databaseName: dbName,
      credentials: Credentials.fromSecret(masterUserSecret),
      backupRetention: Duration.days(7),
      deleteAutomatedBackups: true,
      removalPolicy: RemovalPolicy.DESTROY
    });

    const initializer = new CdkResourceInitializer(this, 'MyRdsInit', {
      config: {
        credsSecretName
      },
      fnLogRetention: RetentionDays.FIVE_MONTHS,
      fnCode: DockerImageCode.fromImageAsset(
        `${__dirname}/../resources/rds-init-fn-code`,
        {}
      ),
      fnTimeout: Duration.minutes(2)
    });

    // manage resources dependency
    initializer.customResource.node.addDependency(dbInstance);

    // allow initializer and donation function to read RDS instance creds secret
    masterUserSecret.grantRead(initializer.function);

    // initialize the donation function here
    const lambdaDeploy = new DonationFunctionDeploy(
      this,
      'DonationFunctionDeploy',
      {
        fnLogRetention: RetentionDays.FIVE_MONTHS,
        fnCode: Code.fromAsset(`${__dirname}/../resources/donation-fn-code`),
        fnTimeout: Duration.minutes(2)
      }
    );
    masterUserSecret.grantRead(lambdaDeploy.donationFunction);

    new CfnOutput(this, 'DonationFunctionUrl', {
      value: lambdaDeploy.donationFunctionUrl.url
    });

    /* eslint no-new: 0 */
    new CfnOutput(this, 'RdsInitFnResponse', {
      value: Token.asString(initializer.response)
    });
  }
}
