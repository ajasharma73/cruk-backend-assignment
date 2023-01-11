import { Duration, Stack } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { DATABASE_NAME, DATABASE_SECRET_NAME } from './env';

export interface DonationFunctionDeployProps {
  fnTimeout: Duration
  fnLogRetention: RetentionDays
  fnMemorySize?: number
}

export class DonationFunctionDeploy extends Construct {
  public readonly donationFunction: lambda.Function
  public readonly donationFunctionUrl: lambda.FunctionUrl

  constructor (scope: Construct, id: string, props: DonationFunctionDeployProps) {
    super(scope, id)

    const stack = Stack.of(this)

    this.donationFunction = new lambda.Function(this, "DonationsFunction", {
      functionName: `${id}-DonationsFunction${stack.stackName}`,
      runtime: lambda.Runtime.NODEJS_16_X, // So we can use async in my_lambda.js
      code: lambda.Code.fromAsset("resources"), // Note 'resources' is the folder we created
      handler: "lambda.main", //Note lambda is our filename, and main is our function
      timeout: props.fnTimeout,
      logRetention: props.fnLogRetention,
      environment: {
        DATABASE_NAME,
        DATABASE_SECRET_NAME
      }
    });

    this.donationFunctionUrl = this.donationFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });
  }
}
