import { apiSlice } from "./apiSlice"; // APIの共通設定を管理するスライスをインポート
import { ORDERS_URL } from "../constants"; // 注文関連APIのURL定数をインポート

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
        body: { ...order }, // リクエストのbodyに注文データを設定（orderオブジェクトを展開して渡す）
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
  }),
});

// エクスポート
export const { useCreateOrderMutation, useGetOrderDetailsQuery } =
  orderApiSlice;
