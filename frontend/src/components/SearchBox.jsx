import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate(); // ページ遷移用の関数を取得
  const { keyword: urlKeyword } = useParams(); // URLパラメータから検索キーワードを取得
  const [keyword, setKeyword] = useState(urlKeyword); // 入力フォームの状態を管理

  // フォーム送信時の処理
  const submitHandler = (e) => {
    e.preventDefault(); // フォームのデフォルト送信を防ぐ
    if (keyword.trim()) {
      // キーワードが空でない場合
      setKeyword(""); // フォームをクリア
      navigate(`/search/${keyword.trim()}`); // 検索結果ページに遷移
    } else {
      navigate("/"); // キーワードが空ならホームへ
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      {" "}
      {/* フォームの送信時にsubmitHandlerを実行 */}
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)} // 入力が変更されたらkeywordを更新
        value={keyword} // 入力フォームの値をkeywordに紐づけ
        placeholder="商品検索" // プレースホルダー
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-light" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
