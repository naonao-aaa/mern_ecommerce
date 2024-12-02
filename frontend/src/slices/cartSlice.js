import { createSlice } from "@reduxjs/toolkit"; // Redux ToolkitのcreateSlice関数をインポート
import { updateCart } from "../utils/cartUtils"; // updateCart関数をインポート

// カートの初期状態を設定
const initialState = localStorage.getItem("cart") // ローカルストレージに"cart"データがあるか確認
  ? JSON.parse(localStorage.getItem("cart")) // あればそれを初期状態として使う（JSON文字列をオブジェクトに変換）
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" }; // 初期状態として空のカートとデフォルトの設定を指定

// createSliceでcartSliceを作成し、カートの状態とreducersを管理
const cartSlice = createSlice({
  name: "cart", // sliceの名前を"cart"として設定
  initialState, // 初期状態を指定
  reducers: {
    // カートに商品を追加するアクション
    addToCart: (state, action) => {
      // 追加する商品データ
      const item = action.payload;

      // カート内に、追加しようとしている商品と同じIDの商品があるかを確認
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // もし既に商品があれば、数量を更新
        state.cartItems = state.cartItems.map(
          (x) => (x._id === existItem._id ? item : x) // 同じIDの商品の数量を新しいitemで上書き
        );
      } else {
        // もし商品がなければ、新しい商品をカートに追加
        state.cartItems = [...state.cartItems, item]; // 配列に新しい商品を追加
      }

      // カートの状態を更新する関数updateCartを呼び出し、stateとitemを引数に渡す
      return updateCart(state, item);
    },
    // カートから商品を削除するアクション
    removeFromCart: (state, action) => {
      // カートから指定IDのアイテムを削除
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload); // 削除対象のID以外のアイテムを残し、新しい配列を作成

      // カートの価格や内容を更新し、保存
      return updateCart(state); // 更新した状態をローカルストレージにも反映
    },
    // 配送先住所の保存をするアクション
    saveShippingAddress: (state, action) => {
      // 入力された配送先住所をstateに保存
      state.shippingAddress = action.payload;
      // ローカルストレージに更新したカート状態を保存
      localStorage.setItem("cart", JSON.stringify(state));
    },
    // 支払い方法を保存するアクション
    savePaymentMethod: (state, action) => {
      // action.payloadには新しい支払い方法が含まれている
      state.paymentMethod = action.payload;
      // カートの状態をローカルストレージに保存
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions; // 各actionをエクスポート

export default cartSlice.reducer; // cartSliceのreducerをエクスポートして、Reduxストアで使用可能にする
