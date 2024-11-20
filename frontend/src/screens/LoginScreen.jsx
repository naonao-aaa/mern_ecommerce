import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

// ログイン画面用のコンポーネント
const LoginScreen = () => {
  // stateを管理。
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch(); // Reduxのアクションをディスパッチするための関数
  const navigate = useNavigate(); // ページ遷移を実行するための関数

  const [login, { isLoading }] = useLoginMutation(); // ログインAPI呼び出し用の関数と、その状態を取得

  const { userInfo } = useSelector((state) => state.auth); // Reduxストアからユーザー情報を取得

  const { search } = useLocation(); // 現在のURLのクエリ文字列を取得
  const sp = new URLSearchParams(search); // クエリ文字列をパースするオブジェクトを作成
  const redirect = sp.get("redirect") || "/"; // クエリ文字列からリダイレクト先を取得。デフォルトは"/"

  useEffect(() => {
    // ユーザー情報がある場合、自動的にリダイレクト
    if (userInfo) {
      navigate(redirect); // 指定されたリダイレクト先に移動
    }
  }, [navigate, redirect, userInfo]); // 依存関係が変更されるたびに実行

  // フォーム送信時に呼び出される関数
  const submitHandler = async (e) => {
    e.preventDefault(); // ページのリロードを防止
    try {
      const res = await login({ email, password }).unwrap(); // ログインAPIを呼び出し、レスポンスを取得
      dispatch(setCredentials({ ...res })); // レスポンスをReduxストアに保存
      navigate(redirect); // 成功したらリダイレクト
    } catch (err) {
      toast.error(err?.data?.message || err.error); // エラーが発生した場合、通知で表示
    }
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
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          サインイン
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          {/* 新規登録ページへのリンク */}
          初めての方はこちら→{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
