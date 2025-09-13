import { Router } from "express";
const router = Router();
import shopController from "../controllers/shopController.js";

router.post("/", shopController.create);
router.get("/", shopController.getAll);
// router.get("/:id");

export default router;
