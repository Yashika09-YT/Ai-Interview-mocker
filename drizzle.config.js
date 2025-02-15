// import { defineConfig } from "drizzle-kit";

const { deflate } = require("zlib");

// export default defineConfig({
//   dialect: "postgresql",
//   schema: "./src/schema.ts",
//   out: "./drizzle",
// });
/** @type {import ("drizzle-kit").Config} */
export default{
  schema:"./utils/schema.js",
  dialect:'postgresql',
  dbCredentials:{
    url:'postgresql://neondb_owner:npg_6zVqpld4sZMG@ep-falling-flower-a8bj5kgj-pooler.eastus2.azure.neon.tech/Ai-interview?sslmode=require'
  }
}