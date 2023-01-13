import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from 'aws-cdk-lib';
import { RecruitmentStack } from '../lib/recruitment-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new RecruitmentStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
