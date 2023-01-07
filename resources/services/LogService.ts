import * as WinstonCloudWatch from 'winston-cloudwatch';
import * as winston from 'winston';
var NODE_ENV = process.env.NODE_ENV || 'development';

import { format } from 'util';

const LOGLEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const LOGCOLORS = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
};


class LogService {
  private static _logger: winston.Logger;
  public static async initServices() {
    winston.addColors(LOGCOLORS);

    this._logger = winston.createLogger({
      level: 'debug',
      levels: LOGLEVELS,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
      transports: [
        new WinstonCloudWatch({
          level: 'error',
          logGroupName: 'groupName',
          logStreamName: 'errors'
        }),
      ],
      exitOnError: false
    });

    this._logger.on('error', (err) => {
      console.error(err.message);
    });
  }

  public static getLogger() {
    return this._logger;
  }

  public static logInfo(message: string, ...args:string[]) {
    this._logger.info(format(message, ...args));
  }

  public static logError(
    message: string,
    err?: { message: string },
    args?: string[]
  ): void {
    err
      ? this._logger.error(
          format('%s|%s|', message, err.message, args ? args.join('|') : null)
        )
      : this._logger.error(format(message, args ? args.join('|') : null));
  }

}

export default LogService;