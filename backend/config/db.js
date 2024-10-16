import mongoose from "mongoose"; // MongoDBと接続するためのmongooseをインポート

// 非同期関数 connectDB を定義
const connectDB = async () => {
  try {
    // mongoose.connectでMongoDBに接続
    // 環境変数に保存されたMONGO_URIを使って接続先を指定
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`); // 接続に成功した場合、接続先のホスト名をログに出力
  } catch (error) {
    console.error(`Error: ${error.message}`); // 接続に失敗した場合、エラーメッセージをログに出力

    process.exit(1); // プロセスを終了させ、エラーステータスコード 1 を返す
  }
};

export default connectDB; // connectDB 関数をエクスポートして、他のファイルからインポートできるようにする
