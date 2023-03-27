const toBoolean = require('to-bool');
require('dotenv').config();

const dbConfig = {
  // use_env_variable:
  //   process.env.DB_CONN_URI && process.env.DB_CONN_URI.length > 0
  //     ? process.env.DB_CONN_URI
  //     : undefined,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: 'postgres',
  logging: false,
  seederStorage: 'sequelize',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  dialectOptions: {
    encrypt: true,
    ssl: toBoolean(process.env.PG_SSL),
  },
};

module.exports = dbConfig;
