// 環境によってBASE_URLを変更
// 開発環境 (development) の場合は、バックエンドAPIがローカルで動いているため、ローカルホストのURLを使用
// それ以外（本番環境やテスト環境）の場合は、ルートパス ("/") が使われる
export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "/";

// 商品関連のAPIエンドポイントのベースURL
export const PRODUCTS_URL = "/api/products";

// ユーザー関連のAPIエンドポイントのベースURL
export const USERS_URL = "/api/users";

// 注文関連のAPIエンドポイントのベースURL
export const ORDERS_URL = "/api/orders";

// PayPalの設定情報を取得するためのAPIエンドポイント
export const PAYPAL_URL = "/api/config/paypal";
