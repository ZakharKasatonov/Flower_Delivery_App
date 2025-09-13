import { Router } from "express";
const router = Router();
import order_itemController from "../controllers/order_itemController.js";

router.post("/", order_itemController.create);
// router.get("/");
// router.get("/:id");

export default router;
