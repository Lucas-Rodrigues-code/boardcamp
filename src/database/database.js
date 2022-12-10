import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

export const connection = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'wjk2578',
  database: 'boardcamp'
});