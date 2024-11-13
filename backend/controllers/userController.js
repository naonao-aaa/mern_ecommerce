import asyncHandler from "../middleware/asyncHandler.js"; // 非同期エラーをキャッチするミドルウェアをインポート
import User from "../models/userModel.js"; // Userモデルをインポート
import generateToken from "../utils/generateToken.js"; //generateToken関数をインポート

// @desc    ユーザー認証とトークンの取得
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // リクエストボディからemailとpasswordを取得

  const user = await User.findOne({ email }); // emailフィールドが一致するユーザーをDBから検索

  // ユーザーが存在し、かつ入力されたパスワードが一致する場合
  if (user && (await user.matchPassword(password))) {
    // generateToken関数を呼び出し、トークンを生成してHTTP-Onlyクッキーに保存
    generateToken(res, user._id);

    // ユーザー情報をJSON形式でレスポンスに返す
    res.status(200).json({
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
  const { name, email, password } = req.body; // リクエストボディからname, email, passwordを取得

  const userExists = await User.findOne({ email }); // DBから同じemailのユーザーが存在するか確認

  // 既に同じemailを持つユーザーがいる場合、エラーレスポンスを返す
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // 新しいユーザーをDBに作成
  const user = await User.create({
    name,
    email,
    password,
  });

  // ユーザーが作成された場合、トークンを生成してクッキーに保存し、ユーザー情報をJSON形式で返す
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // ユーザー作成に失敗した場合、エラーレスポンスを返す
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    ログアウト / クッキーのクリア
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  // クッキーの "jwt" トークンを空にし、クッキーの有効期限を過去に設定して削除
  res.cookie("jwt", "", {
    httpOnly: true, // JavaScriptからのアクセスを禁止し、セキュリティを強化
    expires: new Date(0), // 有効期限を1970年1月1日に設定して、クッキーを即時無効化
  });
  // ログアウトが成功したことを示すメッセージを含むレスポンスを返す
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    ユーザープロフィールの取得
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // 現在認証されているユーザーのIDを使用して、DBからユーザー情報を取得
  const user = await User.findById(req.user._id);

  if (user) {
    // ユーザーが見つかった場合、ユーザー情報をJSON形式で返す
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // ユーザーが見つからない場合、エラーメッセージを返す
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    ユーザープロフィールの更新
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // 現在認証されているユーザーのIDでDBからユーザー情報を取得
  const user = await User.findById(req.user._id);

  if (user) {
    // ユーザーが存在する場合、リクエストボディの新しい値でユーザー情報を更新
    user.name = req.body.name || user.name; // リクエストに`name`が含まれていればその値で更新し、無ければ既存の値を維持
    user.email = req.body.email || user.email; // リクエストに`email`が含まれていればその値で更新し、無ければ既存の値を維持

    // パスワードが提供されていれば、それを更新
    if (req.body.password) {
      user.password = req.body.password;
    }

    // 更新後のユーザー情報をDBに保存
    const updatedUser = await user.save();

    // 更新されたユーザー情報をクライアントに返す
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    // ユーザーが見つからない場合、404エラーステータスとエラーメッセージを返す
    res.status(404);
    throw new Error("User not found");
  }
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
