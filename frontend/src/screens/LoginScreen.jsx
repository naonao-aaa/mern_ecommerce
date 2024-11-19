import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

// ログイン画面用のコンポーネント
const LoginScreen = () => {
  // stateを管理。
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // フォーム送信時に呼び出される関数
  const submitHandler = async (e) => {
    e.preventDefault(); // ページのリロードを防止
    console.log("submit"); // デバッグ用ログ（後で削除予定）
  };

  return (
    <FormContainer>
      {/* フォームを中央に配置するコンテナ */}
      <h1>サインイン</h1>
      {/* フォームのタイトル */}
      <Form onSubmit={submitHandler}>
        {/* フォームの送信時にsubmitHandlerを実行 */}
        <Form.Group className="my-2" controlId="email">
          {/* Email入力用のフィールド */}
          <Form.Label>メールアドレス</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 入力値が変更されるたびにemail状態を更新
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          {/* パスワード入力用のフィールド */}
          <Form.Label>パスワード</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 入力値が変更されるたびにpassword状態を更新
          ></Form.Control>
        </Form.Group>
        {/* フォーム送信ボタン */}
        <Button type="submit" variant="primary">
          サインイン
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          {/* 新規登録ページへのリンク */}
          初めての方はこちら→ <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
