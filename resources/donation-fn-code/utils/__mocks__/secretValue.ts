import { connectionConfig } from '../../../../test/donation-function-tests/database/knexconfig';
import { DATABASE_SECRET_NAME } from '../../env';

type GetSecretValueRet = {
  username: string;
  password: string;
  host: string;
};

function getSecretValue(secretId: string): Promise<GetSecretValueRet | Error> {
  return new Promise((resolve, reject) => {
    if (secretId === DATABASE_SECRET_NAME) {
      resolve({
        username: connectionConfig.user,
        password: connectionConfig.password,
        host: connectionConfig.host
      });
    } else {
      reject(new Error('Secret not found'));
    }
  });
}

export { GetSecretValueRet, getSecretValue };
