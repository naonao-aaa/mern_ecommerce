import jwt from "jsonwebtoken"; // JWT（JSON Web Token）を使用するためのモジュールをインポート

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // トークンの有効期限を30日間に設定
  });

  // JWTをHTTP-Onlyクッキーとして設定
  res.cookie("jwt", token, {
    httpOnly: true, // JavaScriptからアクセスできないようにする（セキュリティ強化）
    secure: process.env.NODE_ENV !== "development", // 開発環境以外ではセキュアなクッキーを使用
    sameSite: "strict", // CSRF攻撃を防ぐためにstrict設定
    maxAge: 30 * 24 * 60 * 60 * 1000, // クッキーの有効期間を30日間に設定
  });
};

export default generateToken;
