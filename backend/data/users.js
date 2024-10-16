import bcrypt from "bcryptjs"; // bcryptjsモジュールをインポート（パスワードのハッシュ化に使用）

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10), // パスワードをハッシュ化
    isAdmin: true, // 管理者フラグをtrueに設定
  },
  {
    name: "澤部佑",
    email: "sawabe@email.com",
    password: bcrypt.hashSync("123456", 10), // パスワードをハッシュ化
  },
  {
    name: "若林正恭",
    email: "wakabayashi@email.com",
    password: bcrypt.hashSync("123456", 10), // パスワードをハッシュ化
  },
];

export default users;
