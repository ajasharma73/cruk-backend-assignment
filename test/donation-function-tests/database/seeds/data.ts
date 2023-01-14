import { Knex } from 'knex';
import { users } from '../data/users';
import { donations } from '../data/donations';
import { userDonationMap } from '../data/user-donation-map';
import TABLES from '../../../../resources/donation-fn-code/constants/tables';

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLES.USER_DONATION_MAP).del();
  await knex(TABLES.DONATIONS).del();
  await knex(TABLES.USERS).del();

  await knex(TABLES.USERS).insert(users);
  await knex(TABLES.DONATIONS).insert(donations);
  await knex(TABLES.USER_DONATION_MAP).insert(userDonationMap);
}
