import TABLES from "../../../../resources/donation-fn-code/constants/tables";

export const DELETE_USERS_TABLE = `
DROP TABLE IF EXISTS ${TABLES.USERS};`;

export const DELETE_DONATIONS_TABLE = `
DROP TABLE IF EXISTS ${TABLES.DONATIONS};`;

export const DELETE_USER_DONATE_MAP_TABLE = `
DROP TABLE IF EXISTS ${TABLES.USER_DONATION_MAP};`;