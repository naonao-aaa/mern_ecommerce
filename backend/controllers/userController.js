import asyncHandler from "../middleware/asyncHandler.js"; // 非同期エラーをキャッチするミドルウェアをインポート
import User from "../models/userModel.js"; // Userモデルをインポート

// @desc    ユーザー認証とトークンの取得
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
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
