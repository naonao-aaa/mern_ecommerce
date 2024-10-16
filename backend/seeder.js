import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors"; // colorsモジュールをインポート（コンソールにカラフルなログ出力ができるようにする）
import users from "./data/users.js"; // サンプルユーザーデータをインポート
import products from "./data/products.js"; // サンプル商品データをインポート
import User from "./models/userModel.js"; // ユーザーモデルをインポート
import Product from "./models/productModel.js"; // 商品モデルをインポート
import Order from "./models/orderModel.js"; // 注文モデルをインポート
import connectDB from "./config/db.js"; // データベース接続関数をインポート

dotenv.config(); // .envファイルに記載された環境変数を読み込む

connectDB(); // MongoDBに接続

// サンプルデータをデータベースにインポートする関数
const importData = async () => {
  try {
    // 既存のデータをすべて削除
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // サンプルのユーザーデータを挿入
    const createdUsers = await User.insertMany(users);

    // 管理者ユーザーのIDを取得
    const adminUser = createdUsers[0]._id;

    // 商品データに管理者ユーザーIDを追加
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // サンプルの商品データを挿入
    await Product.insertMany(sampleProducts);

    // データインポート完了のメッセージをコンソールに表示
    console.log("Data Imported!".green.inverse);

    // プロセス終了
    process.exit();
  } catch (error) {
    // エラーメッセージをコンソールに表示
    console.error(`${error}`.red.inverse);
    // エラーが発生した場合、プロセスを異常終了
    process.exit(1);
  }
};

// データベースのデータをすべて削除する関数
const destroyData = async () => {
  try {
    // 既存のデータをすべて削除
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // データ削除完了のメッセージをコンソールに表示
    console.log("Data Destroyed!".red.inverse);

    // プロセス終了
    process.exit();
  } catch (error) {
    // エラーメッセージをコンソールに表示
    console.error(`${error}`.red.inverse);
    // エラーが発生した場合、プロセスを異常終了
    process.exit(1);
  }
};

// コマンドライン引数を確認して、削除かインポートの処理を実行
if (process.argv[2] === "-d") {
  destroyData(); // コマンドライン引数に `-d` があれば、データを削除
} else {
  importData(); // それ以外の場合、データをインポート
}
