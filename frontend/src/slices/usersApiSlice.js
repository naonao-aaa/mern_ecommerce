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
    // ログアウト処理のエンドポイント
    logout: builder.mutation({
      // API呼び出し時のリクエスト設定を定義
      query: () => ({
        url: `${USERS_URL}/logout`, // USERS_URLに"/logout"を追加したURL
        method: "POST", // HTTP POSTメソッドでリクエストを送信
      }),
    }),
    // ユーザー登録用のエンドポイント
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`, // リクエスト先のURL（ユーザー関連エンドポイント）
        method: "POST", // HTTP POSTメソッドでリクエストを送信
        body: data, // リクエストボディとして送信するデータ
      }),
    }),
    // プロフィール情報更新エンドポイント
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`, // プロフィール更新用のエンドポイントURL
        method: "PUT", // PUTメソッドで既存のデータを更新
        body: data, // 更新するユーザープロフィール情報をリクエストボディに含める
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

// エクスポート
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
} = userApiSlice;
