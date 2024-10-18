import express from "express";
import UserRouter from "./userRouter";
import ProductRouter from "./productRouter";
import OrderRouter from "./orderRouter";

const router = express.Router();

router.use("/users", UserRouter);
router.use("/products", ProductRouter);
router.use("/orders", OrderRouter);

export default router;
