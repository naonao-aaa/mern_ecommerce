import { PRODUCTS_URL } from "../constants"; // APIのエンドポイントURLを定数としてインポート
import { apiSlice } from "./apiSlice"; // 既存のapiSliceをインポートして拡張するために使用

// 商品APIエンドポイントを追加するproductSliceを作成
export const productSlice = apiSlice.injectEndpoints({
  // エンドポイントの設定を行う
  endpoints: (builder) => ({
    // getProductsエンドポイントを定義
    getProducts: builder.query({
      // 商品データを取得するためのHTTPリクエスト設定
      query: () => ({
        url: PRODUCTS_URL, // リクエスト先のURL ("/api/products")
      }),
      keepUnusedDataFor: 5, // 未使用データをキャッシュしておく時間（秒単位）。ここでは5秒間保持
    }),
  }),
});

// Reactコンポーネントで使用するためのフックを自動生成
// useGetProductsQueryフックをエクスポートし、これを使用して商品データを取得できる
export const { useGetProductsQuery } = productSlice;
