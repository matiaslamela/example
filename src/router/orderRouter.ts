import express from "express";
import controllers from "../controller/index";

const orderController = controllers.getOrderController();

const router = express.Router();

router.get("/:id", orderController.findOrderById);
router.post("/", orderController.createOrder);
router.post("/:id/products/:productId", orderController.addProductToOrder);

export default router;
