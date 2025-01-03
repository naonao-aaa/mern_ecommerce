import { PRODUCTS_URL } from "../constants"; // APIのエンドポイントURLを定数としてインポート
import { apiSlice } from "./apiSlice"; // 既存のapiSliceをインポートして拡張するために使用

// 商品APIエンドポイントを追加するproductsApiSliceを作成
export const productsApiSlice = apiSlice.injectEndpoints({
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
    // getProductDetailsエンドポイントを定義
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`, // 特定の商品の詳細情報を取得するためのURL (例: "/api/products/:id")
      }),
      keepUnusedDataFor: 5, // この詳細データも5秒間キャッシュ
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
} = productsApiSlice;
