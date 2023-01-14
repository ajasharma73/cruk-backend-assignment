import type {
  EnvironmentContext,
  JestEnvironmentConfig
} from '@jest/environment';
import NodeEnvironment from 'jest-environment-node';
import knex, { Knex } from 'knex';
import { MySqlConnectionConfig } from '../../../resources/donation-fn-code/types/database.types';

import { config as knexConfig } from './knexconfig';

class CustomEnvironment extends NodeEnvironment {
  private _knex: Knex | undefined;
  private _mainConn: Knex;

  constructor(config: JestEnvironmentConfig, _context: EnvironmentContext) {
    super(config, _context);
    const mainConnConfig = JSON.parse(JSON.stringify(knexConfig));
    (mainConnConfig.connection as MySqlConnectionConfig).database = undefined;
    this._mainConn = knex(mainConnConfig);
  }

  async setup() {
    const config = knexConfig.connection as MySqlConnectionConfig;
    await super.setup();
    console.info(`[ENV] creating db ${config.database}`);
    await this.createDatabase();
    this._knex = knex(knexConfig);
    await this._knex.migrate.latest();
    await this._knex.seed.run();

    this.global.knex = this._knex;
    this.global.dbName = config.database;
  }

  async teardown() {
    const config = knexConfig.connection as MySqlConnectionConfig;
    // We'll be destroying the database here and closing connections.
    console.info(`[ENV] destroying db ${config.database}`);
    await this._knex?.destroy();
    await this.dropDatabase();
    await this._mainConn.destroy();
    await super.teardown();
  }

  async createDatabase() {
    return await this._mainConn.raw(
      `CREATE DATABASE IF NOT EXISTS \`${
        (knexConfig.connection as MySqlConnectionConfig).database
      }\`;`
    );
  }

  async dropDatabase() {
    return await this._mainConn.raw(
      `DROP DATABASE \`${
        (knexConfig.connection as MySqlConnectionConfig).database
      }\`;`
    );
  }

  dispose() {
    // We're not putting anything in here. This is just required to make Jest happy.
  }
}

module.exports = CustomEnvironment;
