import { RequestHandler } from "express";
import { OrderItem, Product } from "../models/models.js";

class OrderItemController {
  create: RequestHandler = async (req, res) => {
    try {
      const { orderId, productId, quantity } = req.body;

      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(400).json({ error: "Product not found" });
      }

      const orderItem = await OrderItem.create({
        orderId,
        productId,
        quantity,
        priceAtPurchase: (product as any).price,
      });

      return res.json(orderItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getById: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const orderItem = await OrderItem.findByPk(id, {
        include: [Product],
      });
      if (!orderItem)
        return res.status(404).json({ error: "OrderItem not found" });

      return res.json(orderItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

export default new OrderItemController();
