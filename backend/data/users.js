import bcrypt from "bcryptjs"; // bcryptjsモジュールをインポート（パスワードのハッシュ化に使用）
import dotenv from "dotenv"; // dotenvモジュールをインポート（環境変数を読み込むため）

dotenv.config(); // .envファイルに記載された環境変数を読み込んで、process.envに設定

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10), // パスワードをハッシュ化
    isAdmin: true, // 管理者フラグをtrueに設定
  },
  {
    name: "澤部佑",
    email: "sawabe@email.com",
    password: bcrypt.hashSync(process.env.SAWABE_PASSWORD, 10), // パスワードをハッシュ化
  },
  {
    name: "若林正恭",
    email: "wakabayashi@email.com",
    password: bcrypt.hashSync(process.env.WAKABAYASHI_PASSWORD, 10), // パスワードをハッシュ化
  },
];

export default users;
