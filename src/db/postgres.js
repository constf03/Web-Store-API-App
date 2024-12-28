import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { DB_URL, DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_URL, {
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  logging: console.log,
});

export default sequelize;
