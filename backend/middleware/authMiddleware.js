import jwt from "jsonwebtoken"; // JWTトークンを操作するためのjsonwebtokenライブラリをインポート
import asyncHandler from "./asyncHandler.js"; // 非同期エラーをキャッチするためのミドルウェアをインポート
import User from "../models/userModel.js"; // ユーザーモデルをインポート

// 認証済みのユーザーのみがアクセスできるようにする保護ミドルウェア
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 'jwt'クッキーからトークンを読み取る
  token = req.cookies.jwt;

  // トークンが存在する場合
  if (token) {
    try {
      // トークンをデコードし、秘密鍵を使用して検証
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // トークンに含まれるユーザーIDを使用して、ユーザー情報を取得（パスワードフィールドを除外）
      req.user = await User.findById(decoded.userId).select("-password");

      // 次のミドルウェアまたはルートハンドラーに制御を渡す
      next();
    } catch (error) {
      console.error(error); // エラーをコンソールに出力
      res.status(401); // ステータスコードを401（認証失敗）に設定
      throw new Error("Not authorized, token failed"); // エラーメッセージをスロー
    }
  } else {
    // トークンが存在しない場合
    res.status(401); // ステータスコードを401に設定
    throw new Error("Not authorized, no token"); // エラーメッセージをスロー
  }
});

// 管理者権限を持つユーザーのみがアクセスできるようにするミドルウェア
const admin = (req, res, next) => {
  // ユーザーが存在し、かつ管理者フラグが立っている場合
  if (req.user && req.user.isAdmin) {
    next(); // 次のミドルウェアまたはルートハンドラーに制御を渡す
  } else {
    // 管理者権限がない場合
    res.status(401); // ステータスコードを401に設定
    throw new Error("Not authorized as an admin"); // エラーメッセージをスロー
  }
};

export { protect, admin }; // protectとadminのミドルウェア関数をエクスポートし、他のファイルで使用可能にする
