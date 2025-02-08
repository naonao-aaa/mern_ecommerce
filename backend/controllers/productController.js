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

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    商品にレビューを追加する
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body; // リクエストボディから評価（rating）とコメント（comment）を取得
  const product = await Product.findById(req.params.id); // 商品IDを使ってデータベースから商品を検索

  if (product) {
    // 既に同じユーザーがレビューを書いていないかをチェック
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    // 新しいレビューを作成
    const review = {
      name: req.user.name, // レビュアーの名前
      rating: Number(rating), // 数値として評価を格納
      comment, // コメント内容
      user: req.user._id, // レビュアーのユーザーID
    };

    // 商品のレビューリストに追加
    product.reviews.push(review);
    product.numReviews = product.reviews.length; // レビュー数を更新

    // 商品の平均評価を再計算
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    // データベースに保存
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
