import * as AWS from 'aws-sdk';

const secrets = new AWS.SecretsManager({});
type GetSecretValueRet = {
  username: string;
  password: string;
  host: string;
};

function getSecretValue(secretId: string): Promise<GetSecretValueRet | Error> {
  return new Promise((resolve, reject) => {
    secrets.getSecretValue({ SecretId: secretId }, (err, data) => {
      if (err) return reject(err);

      return resolve(
        JSON.parse(data.SecretString as string) as GetSecretValueRet
      );
    });
  });
}

export { GetSecretValueRet, getSecretValue };
