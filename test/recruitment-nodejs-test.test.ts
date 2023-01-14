import { Template, Match } from 'aws-cdk-lib/assertions';
import * as cdk from 'aws-cdk-lib';
import { RecruitmentStack } from '../lib/recruitment-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    const stack = new RecruitmentStack(app, 'MyTestStack');

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::SNS::Topic', 1);
});
