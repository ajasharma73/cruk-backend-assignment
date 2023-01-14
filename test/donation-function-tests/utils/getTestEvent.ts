import util from 'util';
const getTestEvent = (email:string)=>({
    "version": "2.0",
    "routeKey": "$default",
    "rawPath": "/",
    "rawQueryString": "",
    "headers": {
        "content-length": "40",
        "x-amzn-tls-version": "TLSv1.2",
        "x-forwarded-proto": "https",
        "postman-token": "ad7666a3-0472-48ad-b258-f2162a0301ad",
        "x-forwarded-port": "443",
        "x-forwarded-for": "213.205.208.80",
        "accept": "*/*",
        "x-amzn-tls-cipher-suite": "ECDHE-RSA-AES128-GCM-SHA256",
        "x-amzn-trace-id": "Root=1-63c272bc-065bc5d643ad2bd42d13e06e",
        "host": "wvdbsaogo34h2ertbt2krijmve0jgtxl.lambda-url.us-east-1.on.aws",
        "content-type": "application/json",
        "accept-encoding": "gzip, deflate, br",
        "user-agent": "PostmanRuntime/7.30.0"
    },
    "requestContext": {
        "accountId": "anonymous",
        "apiId": "wvdbsaogo34h2ertbt2krijmve0jgtxl",
        "domainName": "wvdbsaogo34h2ertbt2krijmve0jgtxl.lambda-url.us-east-1.on.aws",
        "domainPrefix": "wvdbsaogo34h2ertbt2krijmve0jgtxl",
        "http": {
            "method": "POST",
            "path": "/",
            "protocol": "HTTP/1.1",
            "sourceIp": "213.205.208.80",
            "userAgent": "PostmanRuntime/7.30.0"
        },
        "requestId": "94a26133-3889-47b5-b269-6cb0dc822c7d",
        "routeKey": "$default",
        "stage": "$default",
        "time": "14/Jan/2023:09:15:40 +0000",
        "timeEpoch": 1673687740681
    },
    "body": util.format("{\r\n    \"email\":\"%s\"\r\n}", email),
    "isBase64Encoded": false
});

export default getTestEvent;