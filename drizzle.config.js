require("dotenv").config();

/** @type { import("drizzle-kit").Config } */
module.exports = {
  schema: "./db/schema.js",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
};
