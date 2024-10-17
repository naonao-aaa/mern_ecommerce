import express from "express"; // Expressフレームワークをインポート
const router = express.Router(); // Expressのルーターを作成
import asyncHandler from "../middleware/asyncHandler.js"; // 非同期関数用のエラーハンドリングを行うミドルウェアをインポート
import Product from "../models/productModel.js"; // 商品モデルをインポート

// すべての商品を取得するエンドポイント
router.get(
  "/", // (/api/products)
  asyncHandler(async (req, res) => {
    // 商品データをMongoDBから取得
    const products = await Product.find({});
    // 取得した商品データをレスポンスとして返す（JSON形式）
    res.json(products);
  })
);

// 特定の商品をIDで取得するエンドポイント
router.get(
  "/:id", // (/api/products/:id)
  asyncHandler(async (req, res) => {
    // MongoDBから指定されたIDの商品を取得
    const product = await Product.findById(req.params.id);
    if (product) {
      // 商品が見つかった場合、その商品データをレスポンスとして返す（JSON形式）
      return res.json(product);
    }
    // 商品が見つからなかった場合、404エラーレスポンスを返す
    res.status(404).json({ message: "Product not found" });
  })
);

export default router; // ルーターをエクスポート
