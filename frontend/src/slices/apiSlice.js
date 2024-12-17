// Redux Toolkit の `fetchBaseQuery` と `createApi` 関数をインポート
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// 定数ファイルから、環境に応じたBASE_URLをインポート
import { BASE_URL } from "../constants";

// `fetchBaseQuery`を使って基本となるAPIクエリを作成
// このクエリは、BASE_URLを基にAPIリクエストを行う
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// `createApi` 関数を使って、APIスライスを定義
// Redux Toolkit Queryの設定が含まれている
export const apiSlice = createApi({
  // APIの基本クエリを設定
  baseQuery,

  // キャッシュのタグの種類を定義
  // これにより、キャッシュされたデータをリフレッシュするトリガーや関連づけが可能
  tagTypes: ["Product", "Order", "User"],

  // APIエンドポイントの定義部分（後で具体的なエンドポイントを追加するための準備）
  endpoints: (builder) => ({}),
});
