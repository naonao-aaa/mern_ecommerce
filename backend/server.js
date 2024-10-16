import express from "express"; // Expressフレームワークをインポート
import products from "./data/products.js"; // 商品データをインポート
import dotenv from "dotenv"; // dotenvモジュールをインポート（環境変数を読み込むため）
dotenv.config(); // .envファイルに記載された環境変数を読み込んで、process.envに設定
import connectDB from "./config/db.js"; // MongoDBとの接続を行うための関数をインポート

// サーバーが使用するポート番号を設定。環境変数PORTが設定されていない場合はデフォルトで5000番を使用
const port = process.env.PORT || 5000;

// MongoDBに接続するための関数を実行
// MongoDBとの接続を確立し、接続成功/失敗の情報をログに出力する処理が実行される
connectDB();

// Expressアプリケーションの作成
const app = express();

// エンドポイント：/api/products
// 商品一覧を取得するためのAPI。すべての商品のデータをJSON形式で返す
app.get("/api/products", (req, res) => {
  res.json(products);
});

// エンドポイント：/api/products/:id
// 特定の商品を取得するためのAPI。リクエストパラメータとして商品IDを受け取り、その商品データを返す
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

// エンドポイント：ルート（/）
// APIの動作確認用のシンプルなエンドポイント。文字列を返す
app.get("/", (req, res) => {
  res.send("API is running...");
});

// サーバーを指定したポートでリッスン（待機）させる
app.listen(port, () => console.log(`Server running on port ${port}`));
