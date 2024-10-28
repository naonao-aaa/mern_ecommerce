import { createSlice } from "@reduxjs/toolkit"; // Redux ToolkitのcreateSlice関数をインポート

// カートの初期状態を設定
const initialState = localStorage.getItem("cart") // ローカルストレージに"cart"データがあるか確認
  ? JSON.parse(localStorage.getItem("cart")) // あればそれを初期状態として使う（JSON文字列をオブジェクトに変換）
  : { cartItems: [] }; // なければ空のカートアイテムの配列を持つオブジェクトとして初期化

// createSliceでcartSliceを作成し、カートの状態とreducersを管理
const cartSlice = createSlice({
  name: "cart", // sliceの名前を"cart"として設定
  initialState, // 初期状態を指定
  reducers: {}, // 今回はまだアクションの定義はないが、今後追加できるようにreducersを設定
});

export default cartSlice.reducer; // cartSliceのreducerをエクスポートして、Reduxストアで使用可能にする
