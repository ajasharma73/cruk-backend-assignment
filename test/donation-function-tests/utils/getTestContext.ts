import { Context } from "aws-lambda";

const getTestContext = () => ({
    "callbackWaitsForEmptyEventLoop": true,
    "functionVersion": "$LATEST",
    "functionName": "DonationFunctionDeploy-DonationsFunctionRecruitmentStack",
    "memoryLimitInMB": "128",
    "logGroupName": "/aws/lambda/DonationFunctionDeploy-DonationsFunctionRecruitmentStack",
    "logStreamName": "2023/01/14/[$LATEST]1f6b7cb52ad9451cbaf0f2bee4b9ffa2",
    "invokedFunctionArn": "arn:aws:lambda:us-east-1:582593384005:function:DonationFunctionDeploy-DonationsFunctionRecruitmentStack",
    "awsRequestId": "94a26133-3889-47b5-b269-6cb0dc822c7d"
}) as Context

export default getTestContext;
