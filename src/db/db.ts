// import { Pool } from "pg";
// import {drizzle} from "drizzle-orm/node-postgres"

import {drizzle} from "drizzle-orm/vercel-postgres"
import dotenv from 'dotenv'
import { sql } from "@vercel/postgres";
import * as schema from "./schema"

dotenv.config()

// Dùng cho Node hoặc local
/* const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
})
export const db = drizzle(pool) */

// Dùng cho vercel
export const db = drizzle(sql, { schema })