import asyncHandler from "../middleware/asyncHandler.js"; // 非同期関数用のエラーハンドリングを行うミドルウェアをインポート
import Product from "../models/productModel.js"; // Productモデルをインポート

// @desc    すべての商品を取得する
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // MongoDBから全ての商品データを取得する
  const products = await Product.find({});
  // 取得した商品データをレスポンスとして返す（JSON形式）
  res.json(products);
});

// @desc    特定の商品をIDで取得する
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  // URLパラメータから取得したIDを使ってMongoDBから商品を検索する
  const product = await Product.findById(req.params.id);

  // 商品が見つかった場合、その商品データをレスポンスとして返す（JSON形式）
  if (product) {
    return res.json(product);
  }

  // 商品が見つからなかった場合、404エラーステータスを設定し、エラーを投げる
  res.status(404);
  throw new Error("Resource not found");
});

// コントローラー関数をエクスポート
export { getProducts, getProductById };
