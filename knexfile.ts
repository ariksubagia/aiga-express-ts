import type { Knex } from "knex";
import settings from './src/settings'

const defaultConf = settings.db.default
const testConf = settings.db.testing

const config: { [key: string]: Knex.Config } = {
  default: {
    client: defaultConf.client,
    connection: {
      database: defaultConf.database,
      user: defaultConf.username,
      password: defaultConf.password,
      port: defaultConf.port,
      host: defaultConf.host
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite3',
    },
  },
};

module.exports = config;
