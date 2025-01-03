import express from "express"; // Expressフレームワークをインポート
const router = express.Router(); // Expressのルーターを作成
import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById);

export default router; // ルーターをエクスポート
