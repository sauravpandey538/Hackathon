// import dotenv from "dotenv";
// dotenv.config();

const dotenv = require("dotenv");
dotenv.config();

const knexConfig = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "itsmine", // Change to your PostgreSQL password
      database: "SchoolGrid", // Change to your database name
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    pool: {
      min: 2,
      max: 30,
    },
  },
  production: {
    client: "pg",
    connection: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false,
      // sslmode: "require",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
module.exports = knexConfig;

//bun init -y
//bun ./lib/db.ts
