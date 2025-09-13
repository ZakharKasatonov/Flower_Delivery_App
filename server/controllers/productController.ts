import { RequestHandler } from "express";
import { Product } from "../models/models.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import { UploadedFile } from "express-fileupload";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class ProductController {
  create: RequestHandler = async (req, res) => {
    try {
      const { name, description, price, shopId } = req.body;
      const { imageUrl } = req.files as any;
      let fileName = uuidv4() + ".jpg";
      imageUrl.mv(path.resolve(__dirname, "..", "static", fileName));

      const product = await Product.create({
        name,
        description,
        price,
        shopId,
        imageUrl: fileName,
      });

      return res.json(product);
    } catch (e) {}
  };

  getAll: RequestHandler = async (req, res) => {
    try {
      let { shopId, limit, page } = req.query as {
        shopId?: string;
        limit?: string;
        page?: string;
      };

      const pageNum = page ? parseInt(page) : 1;
      const limitNum = limit ? parseInt(limit) : 9;
      const offset = (pageNum - 1) * limitNum;

      let products;
      if (!shopId) {
        products = await Product.findAndCountAll({ limit: limitNum, offset });
      } else {
        products = await Product.findAndCountAll({
          where: { shopId: Number(shopId) },
          limit: limitNum,
          offset,
        });
      }

      return res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  getById: RequestHandler = async (req, res) => {
    
  };
}

export default new ProductController();
