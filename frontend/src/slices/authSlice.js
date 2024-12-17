import { createSlice } from "@reduxjs/toolkit"; // Redux ToolkitからcreateSlice関数をインポート

// 初期状態の設定
const initialState = {
  // ローカルストレージに保存されている"userInfo"があれば、それを初期状態に設定
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")) // ローカルストレージから文字列を取得し、JSON形式に変換
    : null, // ローカルストレージにデータが無い場合はnullを設定
};

// authSliceの作成
const authSlice = createSlice({
  name: "auth", // スライスの名前
  initialState, // スライスの初期状態を設定
  reducers: {
    // "setCredentials"アクション
    setCredentials: (state, action) => {
      state.userInfo = action.payload; // Reduxの状態をactionのペイロードで更新
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // ローカルストレージにもデータを保存
    },
    // "logout"アクション
    logout: (state, action) => {
      state.userInfo = null; // Reduxの状態をnullに設定（ログアウト）
      localStorage.removeItem("userInfo"); // ローカルストレージから"userInfo"を削除
    },
  },
});

// setCredentialsとlogoutアクションをエクスポート
export const { setCredentials, logout } = authSlice.actions;

// authSliceのreducerをエクスポート（storeに登録する際に使用）
export default authSlice.reducer;
