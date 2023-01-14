import { Knex } from 'knex';

import { CREATE_DONATIONS_TABLE, CREATE_USERS_TABLE, CREATE_USER_DONATE_MAP_TABLE } from '../queries/create-tables';
import { DELETE_DONATIONS_TABLE, DELETE_USERS_TABLE, DELETE_USER_DONATE_MAP_TABLE } from '../queries/delete-tables';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(CREATE_USERS_TABLE);
  await knex.schema.raw(CREATE_DONATIONS_TABLE);
  await knex.schema.raw(CREATE_USER_DONATE_MAP_TABLE);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(DELETE_USER_DONATE_MAP_TABLE);
  await knex.schema.raw(DELETE_DONATIONS_TABLE);
  await knex.schema.raw(DELETE_USERS_TABLE);
}
