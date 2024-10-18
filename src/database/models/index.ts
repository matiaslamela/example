// import sequelizeConfig from '../config/config';
import User from "./user";
import { Sequelize } from "sequelize-typescript";
import appConfig from "../../config";
import Order from "./order";
import OrderProduct from "./orderProduct";
import Product from "./product";

// const config = sequelizeConfig[appConfig.env]
let sequelize: Sequelize;
const models = [User, Order, OrderProduct, Product];
if (
  appConfig.env === appConfig.possibleEnviroments.test ||
  appConfig.env === appConfig.possibleEnviroments.development
) {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
    logging: false,
    models,
    repositoryMode: true,
  });
} else {
  sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models,
    repositoryMode: true,
  });
}

export default sequelize;
