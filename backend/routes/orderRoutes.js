import express from "express"; // Expressライブラリをインポート
const router = express.Router(); // Expressのルーターを作成
import {
  addOrderItems, // 新しい注文を作成するコントローラー関数をインポート
  getOrderById, // 特定の注文詳細を取得するコントローラー関数をインポート
  updateOrderToPaid, // 注文を支払い済みに更新するコントローラー関数をインポート
  updateOrderToDelivered, // 注文を配送済みに更新するコントローラー関数をインポート
  getMyOrders, // ログイン中のユーザーの注文履歴を取得するコントローラー関数をインポート
  getOrders, // すべての注文を取得するコントローラー関数（管理者専用）をインポート
} from "../controllers/orderController.js"; // 各コントローラー関数をインポート
import { protect, admin } from "../middleware/authMiddleware.js"; // 認証・管理者認証用のミドルウェアをインポート

// `/`ルート
// - POSTリクエスト: 新しい注文を作成（認証が必要）
// - GETリクエスト: すべての注文を取得（管理者専用）
router
  .route("/")
  .post(protect, addOrderItems) // protectミドルウェアで認証後、addOrderItemsコントローラーを実行
  .get(protect, admin, getOrders); // protectミドルウェアとadminミドルウェアで認証後、getOrdersコントローラーを実行

// `/mine`ルート
// - GETリクエスト: ログイン中のユーザーの注文履歴を取得（認証が必要）
router.route("/mine").get(protect, getMyOrders); // protectミドルウェアで認証後、getMyOrdersコントローラーを実行

// `/:id`ルート
// - GETリクエスト: 特定の注文詳細を取得（認証が必要、管理者専用）
router.route("/:id").get(protect, getOrderById); // protectミドルウェアとadminミドルウェアで認証後、getOrderByIdコントローラーを実行

// `/:id/pay`ルート
// - PUTリクエスト: 注文を支払い済みに更新（認証が必要）
router.route("/:id/pay").put(protect, updateOrderToPaid); // protectミドルウェアで認証後、updateOrderToPaidコントローラーを実行

// `/:id/deliver`ルート
// - PUTリクエスト: 注文を配送済みに更新（認証が必要、管理者専用）
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered); // protectミドルウェアとadminミドルウェアで認証後、updateOrderToDeliveredコントローラーを実行

export default router; // エクスポート
