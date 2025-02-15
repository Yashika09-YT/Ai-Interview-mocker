// import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-serverless";
// import * as schema from "./schema";

// const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);

//  const db = drizzle(sql, { schema });
// console.log("Database URL:", process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);

// export default db;
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
const db = drizzle(sql,{schema});
console.log('Database URL:', process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
console.log('Neon client:', sql);

export default db;  // Default export
