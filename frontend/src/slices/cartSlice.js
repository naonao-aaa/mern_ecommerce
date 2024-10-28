import { createSlice } from "@reduxjs/toolkit"; // Redux ToolkitのcreateSlice関数をインポート

// カートの初期状態を設定
const initialState = localStorage.getItem("cart") // ローカルストレージに"cart"データがあるか確認
  ? JSON.parse(localStorage.getItem("cart")) // あればそれを初期状態として使う（JSON文字列をオブジェクトに変換）
  : { cartItems: [] }; // なければ空のカートアイテムの配列を持つオブジェクトとして初期化

// 金額を整数として丸める関数
const addDecimals = (num) => {
  return Math.round(num); // 小数点以下を切り捨てる
};

// createSliceでcartSliceを作成し、カートの状態とreducersを管理
const cartSlice = createSlice({
  name: "cart", // sliceの名前を"cart"として設定
  initialState, // 初期状態を指定
  reducers: {
    // カートに商品を追加するアクション
    addToCart: (state, action) => {
      // 追加する商品データ
      const item = action.payload;

      // カート内に同じIDの商品があるか確認
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // 商品が既にある場合、数量を更新
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // 同じ商品がカートにない場合、新しい商品をカートに追加
        state.cartItems = [...state.cartItems, item];
      }

      // 商品合計金額を計算
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // 配送料を計算（合計金額が5000円より大きい場合は無料、それ以下は500円）
      state.shippingPrice = addDecimals(state.itemsPrice > 5000 ? 0 : 500);

      // 税額を計算（合計金額の10%）
      state.taxPrice = addDecimals(Number((0.1 * state.itemsPrice).toFixed(0)));

      // 総合計金額を計算（商品合計 + 配送料 + 税額）
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(0); // 小数点以下を削除

      // カートの内容をローカルストレージに保存
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions; // 各actionをエクスポートし、他のコンポーネントで利用可能にする

export default cartSlice.reducer; // cartSliceのreducerをエクスポートして、Reduxストアで使用可能にする
