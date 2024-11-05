// 金額を整数として丸める関数
export const addDecimals = (num) => {
  return Math.round(num); // 小数点以下を切り捨てる
};

// カートの状態を更新する関数
export const updateCart = (state) => {
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

  // 更新されたstateを返す
  return state;
};
