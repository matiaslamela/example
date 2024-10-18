import express from "express";
import controllers from "../controller/index";

const userController = controllers.getUserController();

const router = express.Router();

router.get("/", userController.searchUsers);
router.get("/:id", userController.findUserById);
router.post("/", userController.createUser);

export default router;
