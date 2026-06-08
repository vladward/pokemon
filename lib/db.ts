import mysql from 'mysql2/promise';

const isRemote = !!(process.env.DB_HOST && process.env.DB_HOST !== 'localhost');

export const db = mysql.createPool({
  host: process.env.DB_HOST ?? 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_NAME ?? 'pokemon',
  waitForConnections: true,
  connectionLimit: 10,
  ssl: isRemote ? { rejectUnauthorized: true } : undefined,
});
