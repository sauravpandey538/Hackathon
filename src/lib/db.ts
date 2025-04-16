import knexConfig from "@/knexfile";
import knex from "knex";


// Determine the correct environment configuration
const environmentConfig = process.env.NODE_ENV === "production" 
  ? knexConfig.production 
  : knexConfig.development;

// Initialize knex with the appropriate environment configuration
const pg = knex(environmentConfig);
// Test the database connection
pg.raw("SELECT 1")
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed", err));

export default pg;
