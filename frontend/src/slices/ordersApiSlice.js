import { apiSlice } from "./apiSlice"; // APIの共通設定を管理するスライスをインポート
import { ORDERS_URL, PAYPAL_URL } from "../constants"; // APIのURL定数をインポート

// `orderApiSlice`という名前の新しいスライスを定義
// このスライスは`apiSlice`にエンドポイントを追加する形で拡張される
export const orderApiSlice = apiSlice.injectEndpoints({
  // endpointsオプションを使用してエンドポイント（APIの操作）を定義
  endpoints: (builder) => ({
    // createOrderエンドポイントを定義
    createOrder: builder.mutation({
      // クライアントが注文を作成するために使用するミューテーション（データ変更操作）
      query: (order) => ({
        url: ORDERS_URL, // APIのエンドポイントURLを指定（例: /api/orders）
        method: "POST", // HTTPメソッドをPOSTに指定（新しいリソースを作成）
        body: order, // リクエストのbodyに注文データを設定
      }),
    }),
    // 注文詳細取得用のエンドポイント
    getOrderDetails: builder.query({
      // クライアントが注文詳細を取得するためのクエリ設定
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`, // 動的に注文IDをURLに埋め込む（例: /api/orders/{id}）
      }),
      keepUnusedDataFor: 5, // 未使用のデータを5秒間キャッシュとして保持（パフォーマンス向上のため）
    }),
    // 注文を支払済みに更新するためのエンドポイント
    payOrder: builder.mutation({
      // クライアントが注文の支払い情報を更新するために使用するミューテーション（データ変更操作）
      query: ({ orderId, details }) => ({
        // 支払い対象の注文IDをURLに埋め込む
        url: `${ORDERS_URL}/${orderId}/pay`, // 例: /api/orders/{orderId}/pay
        method: "PUT", // HTTPメソッドをPUTに指定（既存リソースの更新）
        body: details, // リクエストのbodyに支払い詳細データを設定
      }),
    }),
    // PayPalのクライアントIDを取得するためのエンドポイント
    getPaypalClientId: builder.query({
      // クライアントがPayPalのクライアントIDを取得するためのクエリ設定
      query: () => ({
        url: PAYPAL_URL, // APIエンドポイントURLを指定（例: /api/config/paypal）
      }),
      keepUnusedDataFor: 5, // 未使用のデータを5秒間キャッシュとして保持（パフォーマンス向上のため）
    }),
    // 自分の注文一覧を取得するためのエンドポイント
    getMyOrders: builder.query({
      // ユーザーが自身の注文履歴を取得するクエリ設定
      query: () => ({
        url: `${ORDERS_URL}/mine`, // 自分の注文一覧を取得するエンドポイントURL（/api/orders/mine）
      }),
      keepUnusedDataFor: 5, // データを5秒間キャッシュとして保持
    }),
    // 全注文情報を取得するためのエンドポイント（管理者用）
    getOrders: builder.query({
      // 管理者がすべての注文情報を取得するクエリ設定
      query: () => ({
        url: ORDERS_URL, // 全注文を取得するエンドポイントURL（/api/orders）
      }),
      keepUnusedDataFor: 5, // 未使用データを5秒間キャッシュとして保持
    }),
    // deliverOrderエンドポイントを定義
    deliverOrder: builder.mutation({
      // クライアントが注文を配送済みに更新するために使用するミューテーション（データ変更操作）
      query: (orderId) => ({
        // 配送済みにする対象の注文IDをURLに埋め込む
        url: `${ORDERS_URL}/${orderId}/deliver`, // 例: /api/orders/{orderId}/deliver
        method: "PUT", // HTTPメソッドをPUTに指定（既存リソースの更新）
      }),
    }),
  }),
});

// エクスポート
export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = orderApiSlice;
