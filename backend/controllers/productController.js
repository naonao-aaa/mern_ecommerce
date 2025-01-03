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

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

export { getProducts, getProductById, createProduct };
