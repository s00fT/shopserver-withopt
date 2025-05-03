require('dotenv').config();

const common = {
  username: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "wgqorhbcJSzuxTSzvThGZMVagmikJWDL",
  database: process.env.DATABASE_NAME || "railway",
  host: process.env.DATABASE_HOST || "metro.proxy.rlwy.net",
  port: Number(process.env.DATABASE_PORT) || 15281,
  dialect: process.env.SQL_DIALECT || "mysql",
  logging: process.env.SQL_LOGGING === "true"
};

module.exports = {
  development: { ...common },
  test: { ...common },
  production: { ...common }
};