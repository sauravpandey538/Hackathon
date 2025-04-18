import knexConfig from "@/knexfile";
import dotenv from "dotenv";
import knex from "knex";

dotenv.config();
console.log(process.env.NODE_ENV);
// Determine the correct environment configuration
const environmentConfig = knexConfig.production;
// process.env.NODE_ENV === "production"
//   ? knexConfig.production
//   : knexConfig.development;

// Initialize knex with the appropriate environment configuration
const pg = knex(environmentConfig);
// Test the database connection
pg.raw("SELECT 1")
  .then(() => console.log("Database connected", process.env.NODE_ENV))
  .catch((err) => console.error("Database connection failed", err));

export default pg;
