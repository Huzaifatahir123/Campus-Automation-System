import { Pool,types } from "pg"
types.setTypeParser(20, (val:any) => parseInt(val, 10));
export const pool = new Pool ({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
})
