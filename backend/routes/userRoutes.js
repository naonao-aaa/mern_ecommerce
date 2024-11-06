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

const router = express.Router(); // ExpressのRouterを作成

// "/"ルートで、「ユーザー登録（POST）」と「全ユーザー取得（GET）」を設定
router.route("/").post(registerUser).get(getUsers);

// "/logout"ルートで、「ログアウト（POST）」を設定
router.post("/logout", logoutUser);

// "/login"ルートで、「ログイン（POST）」を設定
router.post("/login", authUser);

// "/profile"ルートで、「プロフィール取得（GET）」と「プロフィール更新（PUT）」を設定
router.route("/profile").get(getUserProfile).put(updateUserProfile);

// "/:id"ルートで、「特定ユーザーの削除（DELETE）」、「取得（GET）」、「更新（PUT）」を設定
router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);

// ルートをエクスポートし、アプリ全体で使用できるようにする
export default router;
