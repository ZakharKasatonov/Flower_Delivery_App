import { RequestHandler } from "express";
import { Shop } from "../models/models.js";
class ShopController {
  create: RequestHandler = async (req, res) => {
    try {
      const { name } = req.body;
      const shop = await Shop.create({ name });
      return res.json(shop);
    } catch (e) {}
  };

  getAll: RequestHandler = async (req, res) => {
    try {
      const shops = await Shop.findAll();
      return res.json(shops);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

export default new ShopController();
