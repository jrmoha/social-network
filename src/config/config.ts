import dotenv from 'dotenv';
dotenv.config();

const {
  PORT,
  DATABASE_HOST,
  DATABASE,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  // eslint-disable-next-line no-undef
} = process.env;

export default {
  PORT: parseInt(PORT as string, 10),
  database: {
    host: DATABASE_HOST,
    database: DATABASE,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    port: DATABASE_PORT,
  },
};