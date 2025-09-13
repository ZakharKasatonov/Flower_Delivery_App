import { Router } from "express";
const router = Router();
import productController from "../controllers/productController.js";
router.post("/", productController.create);
router.get("/", productController.getAll);
// router.get("/:id");

export default router;
