import { configureStore } from "@reduxjs/toolkit"; // Redux Toolkitからstoreを設定する関数をインポート
import { apiSlice } from "./slices/apiSlice"; // API呼び出しに関するslice（スライス）をインポート
import cartSliceReducer from "./slices/cartSlice"; // カート機能に関するslice（スライス）をインポート

// Reduxストアの設定
const store = configureStore({
  // ストアに登録するreducerを指定
  reducer: {
    // apiSliceに対応するreducerを動的キーで登録
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer, // カート用のreducerを登録。キーは"cart"として指定し、cartSliceでの状態管理を可能に
  },

  // デフォルトのミドルウェアにAPIミドルウェアを追加する
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  // Redux DevToolsを有効にする
  devTools: true,
});

export default store; // ストアをエクスポート
