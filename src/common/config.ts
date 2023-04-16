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
};
