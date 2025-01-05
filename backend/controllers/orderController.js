import asyncHandler from "../middleware/asyncHandler.js"; // 非同期関数のエラーをキャッチするためのミドルウェアをインポート
import Order from "../models/orderModel.js"; // Mongooseを使用した注文モデルをインポート

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
// 新しい注文を作成する処理
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems, // 注文した商品リスト
    shippingAddress, // 配送先住所
    paymentMethod, // 支払い方法
    itemsPrice, // 商品合計金額
    taxPrice, // 税金
    shippingPrice, // 配送料
    totalPrice, // 合計金額
  } = req.body;

  // 注文商品が空の場合はエラーを返す
  if (orderItems && orderItems.length === 0) {
    res.status(400); // 400: Bad Request
    throw new Error("No order items"); // エラーメッセージを投げる
  } else {
    // 注文情報を新規作成
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x, // 商品情報をコピー
        product: x._id, // 商品IDをproductフィールドに設定
        _id: undefined, // MongoDBのデフォルトの_idを削除
      })),
      user: req.user._id, // ログインしているユーザーのIDを関連付け
      shippingAddress, // 配送先住所
      paymentMethod, // 支払い方法
      itemsPrice, // 商品合計金額
      taxPrice, // 税金
      shippingPrice, // 配送料
      totalPrice, // 合計金額
    });

    // データベースに保存
    const createdOrder = await order.save();

    // 作成した注文をレスポンスとして返す
    res.status(201).json(createdOrder); // 201: Created
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
// 指定されたIDの注文情報を取得する処理
const getOrderById = asyncHandler(async (req, res) => {
  // 注文IDに基づいてデータベースから注文を検索
  const order = await Order.findById(req.params.id).populate(
    "user", // userフィールドを参照し、関連するユーザー情報を取得
    "name email" // 必要なユーザー情報（名前とメールアドレス）のみ取得
  );

  if (order) {
    // 注文が見つかった場合はレスポンスとして返す
    res.status(200).json(order); // 200: OK
  } else {
    // 注文が見つからなかった場合は404エラーを返す
    res.status(404); // 404: Not Found
    throw new Error("Order not found"); // エラーメッセージを投げる
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
// 指定されたIDの注文を支払い済みに更新する処理
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // データベースから、指定されたIDの注文を検索
  const order = await Order.findById(req.params.id);

  if (order) {
    // 支払い済みフラグをtrueに設定
    order.isPaid = true;
    // 支払いが完了した日時を記録（現在の日時）
    order.paidAt = Date.now();
    // 支払いの詳細情報を記録
    order.paymentResult = {
      id: req.body.id, // 支払いサービスから提供された一意の支払いID
      status: req.body.status, // 支払いのステータス（例: "Completed"）
      update_time: req.body.update_time, // 支払いが完了した日時（サービス提供側のデータ）
      email_address: req.body.payer.email_address, // 支払いを行ったユーザーのメールアドレス
    };

    // 注文情報を更新してデータベースに保存
    const updatedOrder = await order.save();

    // 更新された注文情報をレスポンスとして返す
    res.status(200).json(updatedOrder);
  } else {
    // 注文が見つからなかった場合は404エラーを返す
    res.status(404);
    // エラーメッセージを投げる
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
// 指定されたIDの注文を配送済みに更新する処理（管理者のみ実行可能）
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  // `req.params.id`で受け取った注文IDをもとに、データベースから注文情報を検索
  const order = await Order.findById(req.params.id);

  // 注文が見つかった場合
  if (order) {
    // 配送済みフラグをtrueに設定
    order.isDelivered = true;
    // 配送が完了した日時を記録（現在の日時）
    order.deliveredAt = Date.now();

    // 更新された注文情報をデータベースに保存
    const updatedOrder = await order.save();

    // 更新後の注文情報をレスポンスとして返す
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
// ログイン中のユーザーの注文一覧を取得する処理
const getMyOrders = asyncHandler(async (req, res) => {
  // ログインしているユーザーのIDに基づいて注文を検索
  const orders = await Order.find({ user: req.user._id });
  // ユーザーの注文リストをレスポンスとして返す
  res.status(200).json(orders); // 200: OK
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  // 全ての注文情報を取得する処理（管理者のみ実行可能）

  // データベースからすべての注文情報を検索
  // populateを使って、関連するユーザー情報（idと名前）を取得
  const orders = await Order.find({}).populate("user", "id name");

  // 200 OK のレスポンスとともに、取得した注文情報をJSON形式で返す。
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
