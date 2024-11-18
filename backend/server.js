import express from "express"; // Expressフレームワークをインポート
import dotenv from "dotenv"; // dotenvモジュールをインポート（環境変数を読み込むため）
dotenv.config(); // .envファイルに記載された環境変数を読み込んで、process.envに設定
import cookieParser from "cookie-parser"; // Cookieの解析を行うためのミドルウェアをインポート
import connectDB from "./config/db.js"; // MongoDBとの接続を行うための関数をインポート
import productRoutes from "./routes/productRoutes.js"; // 商品に関するルーティングを管理するモジュールをインポート
import userRoutes from "./routes/userRoutes.js"; // ユーザーに関するルーティングを管理するモジュールをインポート
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"; // 404エラーハンドラーとカスタムエラーハンドラーをインポート

// サーバーが使用するポート番号を設定。環境変数PORTが設定されていない場合はデフォルトで5000番を使用
const port = process.env.PORT || 5000;

// MongoDBに接続するための関数を実行
// MongoDBとの接続を確立し、接続成功/失敗の情報をログに出力する処理が実行される
connectDB();

// Expressアプリケーションの作成
const app = express();

// リクエストのbodyからJSON形式のデータを解析するためのミドルウェア。この記述により、req.bodyでJSONデータが取得可能になる。
app.use(express.json());
// リクエストのbodyからURLエンコードされたデータを解析するためのミドルウェア。extendedオプションをtrueにすると、ネストされたオブジェクトも処理可能
app.use(express.urlencoded({ extended: true }));

// Cookieの解析を行うためのミドルウェアを設定
// この記述により、クライアントから送信されるCookieをreq.cookiesオブジェクトでアクセス可能にする
app.use(cookieParser());

// 商品APIのルート（/api/products）を設定
// すべての商品に関するリクエストは、このルーティングモジュールで処理される
app.use("/api/products", productRoutes);

// ユーザーAPIのルート（/api/users）を設定
// すべてのユーザー関連リクエストはこのルーティングモジュールで処理される
app.use("/api/users", userRoutes);

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
