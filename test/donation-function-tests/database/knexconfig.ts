import { Knex } from 'knex';
import path from 'path';

const mysqlConfig = {
  user: 'admin',
  password: 'admin123',
  host: '0.0.0.0',
  port: '3306'
};

const databaseName = 'cruk_test';

export const connectionConfig = {
  user: mysqlConfig.user,
  host: mysqlConfig.host,
  password: mysqlConfig.password,
  database: databaseName
};

export const config = {
  client: 'mysql2',
  connection: connectionConfig,
  migrations: {
    directory: path.join(__dirname, 'migrations')
  },
  seeds: {
    directory: path.join(__dirname, 'seeds')
  }
} as Knex.Config;