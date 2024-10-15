import mongoose from "mongoose"; // Mongooseをインポート

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

// 'User'モデルを作成し、userSchemaをMongoDBにマッピング
const User = mongoose.model("User", userSchema);

export default User; //Userモデルを使用できるようにエクスポート
