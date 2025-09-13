import { Router } from "express";
const router = Router();
import orderController from "../controllers/orderController.js";

router.post("/", orderController.create);
// router.get("/");
// router.get("/:id");

export default router;
