import { apiSlice } from "./apiSlice"; // 基盤となるapiSliceをインポート
import { USERS_URL } from "../constants"; // ユーザー関連のエンドポイントURLをインポート

// userApiSliceを定義し、新しいエンドポイントを追加
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // loginエンドポイントの定義
    login: builder.mutation({
      query: (data) => ({
        // APIリクエストのURLを指定（USERS_URLに"/auth"を追加）
        url: `${USERS_URL}/auth`,
        method: "POST", // HTTP POSTメソッドを使用
        body: data, // リクエストのボディ部分に送信するデータを指定
      }),
    }),
  }),
});

// useLoginMutationフックをエクスポート
export const { useLoginMutation } = userApiSlice;
