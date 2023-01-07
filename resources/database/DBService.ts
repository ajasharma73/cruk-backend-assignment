import knex, { Knex } from "knex";
import { MySqlConnectionConfig } from "../types/database.types";
import { getSecretValue, GetSecretValueRet } from "../utils/secretValue";

const DATABASE_NAME = process.env.DATABASE_NAME ?? "CRUK";
const CREDS_SECRET_NAME = process.env.CREDS_SECRET_NAME ?? "aws_cred";
class DBService {
    private static _db: Knex;
    public static getConnection(){
        return this._db;
    }

    static async initialiseDb(){
        const { password, username, host } = (await getSecretValue(CREDS_SECRET_NAME)) as GetSecretValueRet;
        const connectionConfig: MySqlConnectionConfig = {
            user: username,
            host,
            password,
            database: DATABASE_NAME
          };

        this._db = knex({
            client: 'mysql2',
            connection: connectionConfig,
            pool: { min: 0, max: 10 }
          });
    }
}

export default DBService;