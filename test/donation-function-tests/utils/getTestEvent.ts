import { APIGatewayEvent } from 'aws-lambda';
import util from 'util';
const getTestEvent = (email: string) => {
  const headers = {
    'content-length': '40',
    'x-amzn-tls-version': 'TLSv1.2',
    'x-forwarded-proto': 'https',
    'postman-token': 'ad7666a3-0472-48ad-b258-f2162a0301ad',
    'x-forwarded-port': '443',
    'x-forwarded-for': '213.205.208.80',
    accept: '*/*',
    'x-amzn-tls-cipher-suite': 'ECDHE-RSA-AES128-GCM-SHA256',
    'x-amzn-trace-id': 'Root=1-63c272bc-065bc5d643ad2bd42d13e06e',
    host: 'wvdbsaogo34h2ertbt2krijmve0jgtxl.lambda-url.us-east-1.on.aws',
    'content-type': 'application/json',
    'accept-encoding': 'gzip, deflate, br',
    'user-agent': 'PostmanRuntime/7.30.0'
  };

  return {
    resource: 'Resource path',
    path: 'Path parameter',
    httpMethod: "Incoming request's method name",
    headers: headers,
    queryStringParameters: {},
    pathParameters: {},
    stageVariables: null,
    multiValueHeaders: {},
    multiValueQueryStringParameters: {},
    requestContext: {
      accountId: '123456789012',
      resourceId: 'abcdefgh',
      stage: 'prod',
      requestId: 'a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6',
      identity: {
        cognitoIdentityPoolId: 'us-east-1:a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6',
        accountId: '123456789012',
        cognitoIdentityId: 'us-east-1:a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6',
        caller: 'AIDABEHFJGKCLI',
        apiKey: '',
        sourceIp: '123.456.789.012',
        cognitoAuthenticationType: 'authenticated',
        cognitoAuthenticationProvider: 'cognito',
        userArn: 'arn:aws:iam::123456789012:user/username',
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        user: 'AIDABEHFJGKCLI'
      },
      resourcePath: '/{proxy+}',
      httpMethod: 'POST',
      apiId: 'a1b2c3d4e5'
    } as any,
    body: util.format('{\r\n    "email":"%s"\r\n}', email),
    isBase64Encoded: false
  } as APIGatewayEvent;
};

export default getTestEvent;
