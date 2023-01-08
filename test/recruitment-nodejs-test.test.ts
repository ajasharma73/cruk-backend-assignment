import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from 'aws-cdk-lib/core';
import { DatabaseStack } from '../lib/DatabaseStack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new DatabaseStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
