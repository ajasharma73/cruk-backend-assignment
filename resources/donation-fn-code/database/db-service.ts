import knex, { Knex } from "knex";
import { DATABASE_INIT_FAILED } from "../constants/errors";
import { DATABASE_SECRET_NAME } from "../env";
import { MySqlConnectionConfig } from "../types/database.types";
import { getSecretValue, GetSecretValueRet } from "../utils/secretValue";
class DBService {
    private static _db: Knex;
    static getConnection(){
        return this._db;
    }

    static checkConnection(){
        return this._db.raw("SELECT 1");
    }

    static async initialiseDb(){
        try{
            const { password, username, host } = (await getSecretValue(DATABASE_SECRET_NAME)) as GetSecretValueRet;

            const connectionConfig: MySqlConnectionConfig = {
                user: username,
                host,
                password,
                database: process.env.DATABASE_NAME
            };

            this._db = knex({
                client: 'mysql2',
                connection: connectionConfig,
                pool: { min: 0, max: 10 }
            });

            await this.checkConnection();
            return true;
        }catch(err){
            console.error(DATABASE_INIT_FAILED,err as Error);
        }
        return false;
    }
}

export default DBService;