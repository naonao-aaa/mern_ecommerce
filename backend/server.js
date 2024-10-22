import express from "express"; // Expressフレームワークをインポート
import productRoutes from "./routes/productRoutes.js"; // 商品に関するルーティングを管理するモジュールをインポート
import dotenv from "dotenv"; // dotenvモジュールをインポート（環境変数を読み込むため）
dotenv.config(); // .envファイルに記載された環境変数を読み込んで、process.envに設定
import connectDB from "./config/db.js"; // MongoDBとの接続を行うための関数をインポート
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"; // 404エラーハンドラーとカスタムエラーハンドラーをインポート

// サーバーが使用するポート番号を設定。環境変数PORTが設定されていない場合はデフォルトで5000番を使用
const port = process.env.PORT || 5000;

// MongoDBに接続するための関数を実行
// MongoDBとの接続を確立し、接続成功/失敗の情報をログに出力する処理が実行される
connectDB();

// Expressアプリケーションの作成
const app = express();

// 商品APIのルート（/api/products）を設定
// すべての商品に関するリクエストは、このルーティングモジュールで処理される
app.use("/api/products", productRoutes);

// エンドポイント：ルート（/）
// APIの動作確認用のシンプルなエンドポイント。文字列を返す
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 404エラーをキャッチするためのミドルウェア
// エラーを生成し、次のミドルウェアに渡す
app.use(notFound);
// カスタムエラーハンドラー
app.use(errorHandler);

// サーバーを指定したポートでリッスン（待機）させる
app.listen(port, () => console.log(`Server running on port ${port}`));
