import { Router } from "express";
const router = Router();
import shopRouter from "./shopRouter.js";
import orderRouter from "./orederRouter.js";
import productRouter from "./productRouter.js";
import order_itemRouter from "./oreder_itemRouter.js";

router.use("/shop", shopRouter);
router.use("/order", orderRouter);
router.use("/order_item", order_itemRouter);
router.use("/product", productRouter);

export default router;
