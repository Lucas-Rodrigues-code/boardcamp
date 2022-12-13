import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

export const connection = new Pool({
/*    host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password:process.env.PASSWORD ,
  database: process.env.DATABASE */

  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'wjk2578',
  database: 'boardcamp' 
});



