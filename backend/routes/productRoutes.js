import express from "express"; // Expressフレームワークをインポート
const router = express.Router(); // Expressのルーターを作成
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router; // ルーターをエクスポート
