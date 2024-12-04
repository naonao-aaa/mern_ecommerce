import asyncHandler from "../middleware/asyncHandler.js"; // 非同期関数のエラーをキャッチするためのミドルウェアをインポート
import Order from "../models/orderModel.js"; // Mongooseを使用した注文モデルをインポート

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  // 新しい注文を作成する処理
  res.send("create order"); // 仮のレスポンスとして文字列を送信
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  // 指定されたIDの注文情報を取得する処理
  res.send("get order by id"); // 仮のレスポンスとして文字列を送信
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // 指定されたIDの注文を支払い済みに更新する処理
  res.send("update order to paid"); // 仮のレスポンスとして文字列を送信
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  // 指定されたIDの注文を配送済みに更新する処理（管理者のみ実行可能）
  res.send("update order to delivered"); // 仮のレスポンスとして文字列を送信
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  // ログイン中のユーザーの注文一覧を取得する処理
  res.send("get logged in user orders"); // 仮のレスポンスとして文字列を送信
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  // 全ての注文情報を取得する処理（管理者のみ実行可能）
  res.send("get all orders"); // 仮のレスポンスとして文字列を送信
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
