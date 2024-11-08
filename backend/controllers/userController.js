import asyncHandler from "../middleware/asyncHandler.js"; // 非同期エラーをキャッチするミドルウェアをインポート
import User from "../models/userModel.js"; // Userモデルをインポート
import jwt from "jsonwebtoken"; // JWT（JSON Web Token）を使用するためのモジュールをインポート

// @desc    ユーザー認証とトークンの取得
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // リクエストボディからemailとpasswordを取得

  const user = await User.findOne({ email }); // emailフィールドが一致するユーザーをDBから検索

  // ユーザーが存在し、かつ入力されたパスワードが一致する場合
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d", // トークンの有効期限を30日間に設定
    });

    // JWTをHTTP-Onlyクッキーとして設定
    res.cookie("jwt", token, {
      httpOnly: true, // JavaScriptからアクセスできないようにする（セキュリティ強化）
      secure: process.env.NODE_ENV !== "development", // 開発環境以外ではセキュアなクッキーを使用
      sameSite: "strict", // CSRF攻撃を防ぐためにstrict設定
      maxAge: 30 * 24 * 60 * 60 * 1000, // クッキーの有効期間を30日間に設定
    });

    // ユーザー情報をJSON形式でレスポンスに返す
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // ユーザーが見つからない、またはパスワードが一致しない場合はエラーレスポンスを返す
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    新しいユーザーの登録
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

// @desc    ログアウト / クッキーのクリア
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

// @desc    ユーザープロフィールの取得
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

// @desc    ユーザープロフィールの更新
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

// @desc    全ユーザーの取得
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// @desc    ユーザーの削除
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// @desc    ユーザーIDによるユーザー情報の取得
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

// @desc    ユーザー情報の更新
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
