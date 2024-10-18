import UserController from "./userController";
import services from "../service/index";
import OrderController from "./orderController";
import ProductController from "./productController";

let userController: UserController;
let orderController: OrderController;
let productController: ProductController;

function getUserController() {
  if (!userController) {
    userController = new UserController(services.getUserService());
  }
  return userController;
}

function getOrderController() {
  if (!orderController) {
    orderController = new OrderController(services.getOrderService());
  }
  return orderController;
}

function getProductController() {
  if (!productController) {
    productController = new ProductController(services.getProductService());
  }
  return productController;
}

export default {
  getUserController,
  getOrderController,
  getProductController,
};
