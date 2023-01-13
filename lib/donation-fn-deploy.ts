import { Duration, Stack } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { DATABASE_NAME, DATABASE_SECRET_NAME } from './env';

export interface DonationFunctionDeployProps {
  fnTimeout: Duration
  fnLogRetention: RetentionDays
  fnMemorySize?: number
  fnCode: lambda.Code
}

export class DonationFunctionDeploy extends Construct {
  public readonly donationFunction: lambda.Function
  public readonly donationFunctionUrl: lambda.FunctionUrl
  public readonly donationSNS: sns.Topic

  constructor (scope: Construct, id: string, props: DonationFunctionDeployProps) {
    super(scope, id)

    const stack = Stack.of(this)

    const topic = new sns.Topic(this, 'Topic', {
        contentBasedDeduplication: true,
        displayName: 'Appreciate the Donations',
        fifo: true,
        topicName: 'charityDonations',
      });

    this.donationFunction = new lambda.Function(this, "DonationsFunction", {
      functionName: `${id}-DonationsFunction${stack.stackName}`,
      runtime: lambda.Runtime.NODEJS_16_X, // So we can use async in my_lambda.js
      code: props.fnCode, // Note 'resources' is the folder we created
      handler: "lambda.main", //Note lambda is our filename, and main is our function
      timeout: props.fnTimeout,
      logRetention: props.fnLogRetention,
      environment: {
        DATABASE_NAME,
        DATABASE_SECRET_NAME,
        TOPIC_ARN: topic.topicArn
      }
    });

    this.donationFunctionUrl = this.donationFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });
  
      topic.grantPublish(this.donationFunction);
      this.donationSNS = topic;
  }
}
