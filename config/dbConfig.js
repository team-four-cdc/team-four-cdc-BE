const toBoolean = require("to-bool");
require("dotenv").config();

const dbConfig = {
  use_env_variable:
    process.env.DB_CONN_URI && process.env.DB_CONN_URI.length > 0
      ? process.env.DB_CONN_URI
      : undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_TYPE,
  logging: false,
  seederStorage: "sequelize",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  dialectOptions: {
    encrypt: true,
    ssl: toBoolean(process.env.DB_SSL),
  },
};

module.exports = dbConfig;
