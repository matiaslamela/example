import express from "express";
import controllers from "../controller/index";

const productController = controllers.getProductController();

const router = express.Router();

router.get("/:id", productController.findProductById);
router.post("/", productController.createProduct);

export default router;
