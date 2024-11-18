import express from "express"; // Expressフレームワークをインポート
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js"; // ユーザー関連のコントローラー関数をインポート
import { protect, admin } from "../middleware/authMiddleware.js"; // 認証・管理者チェックミドルウェアをインポート

const router = express.Router(); // ExpressのRouterを作成

// "/"ルートで、「ユーザー登録（POST）」と「全ユーザー取得（GET）」を設定
// 「全ユーザー取得（GET）」は、認証済みかつ管理者のみアクセス可能に設定
router.route("/").post(registerUser).get(protect, admin, getUsers);

// "/logout"ルートで、「ログアウト（POST）」を設定
router.post("/logout", logoutUser);

// "/auth"ルートで、「ログイン（POST）」を設定
router.post("/auth", authUser);

// "/profile"ルートで、「プロフィール取得（GET）」と「プロフィール更新（PUT）」を設定
// 認証済みユーザーのみがアクセスできるようにprotectミドルウェアを適用
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// "/:id"ルートで、「特定ユーザーの削除（DELETE）」、「取得（GET）」、「更新（PUT）」を設定
// 各エンドポイントに、protectおよびadminミドルウェアを適用し、管理者のみアクセス可能にする
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

// ルートをエクスポートし、アプリ全体で使用できるようにする
export default router;
