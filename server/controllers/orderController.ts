import { RequestHandler } from "express";
import { Order, OrderItem, Product } from "../models/models.js";

class OrderController {
  create: RequestHandler = async (req, res) => {
    try {
      const { email, phone, deliveryAddress, items } = req.body;

      const order = await Order.create({ email, phone, deliveryAddress });

      if (items && Array.isArray(items)) {
        for (const item of items) {
          const product = await Product.findByPk(item.productId);
          if (!product) continue;

          await OrderItem.create({
            orderId: (order as any).id,
            productId: (product as any).id,
            quantity: (item as any).quantity,
            priceAtPurchase: (product as any).price,
          });
        }
      }

      return res.json({ message: "Заказ создан", orderId: (order as any).id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getById: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id, {
        include: [{ model: OrderItem, include: [Product] }],
      });
      if (!order) return res.status(404).json({ error: "Order not found" });

      return res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

export default new OrderController();
