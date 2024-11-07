import mongoose from "mongoose"; // Mongooseをインポート
import bcrypt from "bcryptjs"; // パスワードのハッシュ化に使用するbcryptモジュールをインポート

// ユーザー情報を定義するスキーマを作成
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// インスタンスメソッドの定義：入力されたパスワードと保存されているハッシュ化パスワードを比較
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // bcryptを使ってパスワードを比較
};

// 'User'モデルを作成し、userSchemaをMongoDBにマッピング
const User = mongoose.model("User", userSchema);

export default User; //Userモデルを使用できるようにエクスポート
