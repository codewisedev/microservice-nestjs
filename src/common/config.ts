import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({
  path: '.env',
});

export const Config = {
  app: {
    port: +process.env.SERVER_CONSTANTS_PORT,
    PWD: process.env.PWD,
  },
  mySql: {
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DB_NAME,
  },
};
