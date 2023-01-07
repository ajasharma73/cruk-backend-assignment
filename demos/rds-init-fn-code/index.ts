import * as mysql from "mysql";
import * as fs from "fs";
import * as path from "path";
import { getSecretValue, GetSecretValueRet } from "../../resources/utils/secretValue";

exports.handler = async (e) => {
  try {
    const { config } = e.params
    const { password, username, host } = (await getSecretValue(config.credsSecretName)) as GetSecretValueRet
    const connection = mysql.createConnection({
      host,
      user: username,
      password,
      multipleStatements: true
    })

    connection.connect()

    const sqlScript = fs.readFileSync(path.join(__dirname, 'script.sql')).toString()
    const res = await query(connection, sqlScript)

    return {
      status: 'OK',
      results: res
    }
  } catch (err) {
    return {
      status: 'ERROR',
      err,
      message: (err as Error).message
    }
  }
}

function query (connection: mysql.Connection, sql:string) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, res) => {
      if (error) return reject(error)

      return resolve(res)
    })
  })
}