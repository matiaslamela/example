import sequelize from "../database/models";
import Order from "../database/models/order";
import OrderProduct from "../database/models/orderProduct";
import Product from "../database/models/product";
import User from "../database/models/user";
import OrderService from "./orderService";
import { IOrderService } from "./orderService/iOrderService";
import ProductService from "./productService";
import { IProductService } from "./productService/iProductService";
import UserService from "./userService";
import { IUserService } from "./userService/IUserService";

let userService: IUserService | null = null;
let orderService: IOrderService | null = null;
let productService: IProductService | null = null;

function getUserService(): IUserService {
  if (!userService) {
    userService = new UserService(sequelize.getRepository(User));
  }
  return userService;
}

function getProductService(): IProductService {
  if (!productService) {
    productService = new ProductService(sequelize.getRepository(Product));
  }
  return productService;
}

function getOrderService(): IOrderService {
  if (!orderService) {
    orderService = new OrderService(
      sequelize.getRepository(Order),
      getProductService(),
      sequelize.getRepository(OrderProduct),
    );
  }
  return orderService;
}

export default {
  getUserService,
  getProductService,
  getOrderService,
};
