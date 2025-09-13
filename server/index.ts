import "dotenv/config";
import express from "express";
import { sequelize } from "./db.js";
import "./models/models.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import router from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../static")));
app.use(fileUpload({}));
app.use("/api", router);
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection established");
    await sequelize.sync();
    console.log("✅ Models synced");
    app.listen(PORT, () => console.log(`Serever is raning on port ${PORT}`));
  } catch (e) {
    console.error(e);
  }
};

start();
