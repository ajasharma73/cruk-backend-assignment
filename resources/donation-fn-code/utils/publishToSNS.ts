import * as AWS from 'aws-sdk';
import { TOPIC_ARN } from '../env';

const publishToSNS = (
  message: string,
  messageGroupId: string,
  messageDeduplicationId: string
) => {
  return new Promise((resolve, reject) => {
    new AWS.SNS().publish(
      {
        Message: message,
        MessageDeduplicationId: messageGroupId,
        MessageGroupId: messageDeduplicationId,
        TopicArn: TOPIC_ARN
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

export default publishToSNS;
