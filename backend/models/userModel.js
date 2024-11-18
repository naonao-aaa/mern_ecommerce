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

// パスワードをbcryptで暗号化するためのミドルウェア
userSchema.pre("save", async function (next) {
  // パスワードが変更されていない場合は、次の処理に進む
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10); // bcryptでパスワードをハッシュ化するためのソルトを生成
  this.password = await bcrypt.hash(this.password, salt); // ユーザーのパスワードをソルトと共にハッシュ化して、passwordフィールドに設定
});

// 'User'モデルを作成し、userSchemaをMongoDBにマッピング
const User = mongoose.model("User", userSchema);

export default User; //Userモデルを使用できるようにエクスポート
