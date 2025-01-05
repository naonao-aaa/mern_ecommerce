import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader"; // 読み込み中の状態を表示するコンポーネント
import FormContainer from "../components/FormContainer"; // フォームを中央揃えにするためのレイアウトコンポーネント
import { useRegisterMutation } from "../slices/usersApiSlice"; // 登録API呼び出し用のフック
import { setCredentials } from "../slices/authSlice"; // Reduxでユーザー情報を保存するアクション
import { toast } from "react-toastify"; // 通知メッセージを表示するライブラリ

const RegisterScreen = () => {
  // 各入力フィールドの状態を管理
  const [name, setName] = useState(""); // ユーザー名
  const [email, setEmail] = useState(""); // メールアドレス
  const [password, setPassword] = useState(""); // パスワード
  const [confirmPassword, setConfirmPassword] = useState(""); // パスワード確認用

  const dispatch = useDispatch(); // Reduxのdispatch関数
  const navigate = useNavigate(); // ページ遷移用のフック

  // useRegisterMutationフックを使用して登録API呼び出し関数を取得
  const [register, { isLoading }] = useRegisterMutation();

  // Reduxのstateからログイン中のユーザー情報を取得
  const { userInfo } = useSelector((state) => state.auth);

  // URLクエリパラメータからリダイレクト先を取得
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/"; // リダイレクト先が指定されていない場合はホームページにリダイレクト

  // ログイン済みの場合、リダイレクト先に自動的に遷移
  useEffect(() => {
    if (userInfo) {
      navigate(redirect); // リダイレクト先に移動
    }
  }, [navigate, redirect, userInfo]);

  // フォーム送信時の処理
  const submitHandler = async (e) => {
    e.preventDefault(); // ページリロードを防止
    if (password !== confirmPassword) {
      // パスワードと確認用パスワードが一致しない場合のエラーメッセージ
      toast.error("Passwords do not match");
    } else {
      try {
        // APIにデータを送信して新規登録
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res })); // レスポンスデータをReduxに保存
        navigate(redirect); // 登録後にリダイレクト先に移動
      } catch (err) {
        // エラー発生時の処理
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>新規登録</h1>
      {/* フォームの送信時にsubmitHandlerが呼ばれる */}
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>お名前</Form.Label>
          {/* ユーザー名入力欄 */}
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)} // 入力値を状態に保存
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>メールアドレス</Form.Label>
          {/* メールアドレス入力欄 */}
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 入力値を状態に保存
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          {/* パスワード入力欄 */}
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 入力値を状態に保存
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          {/* パスワード確認入力欄 */}
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // 入力値を状態に保存
          ></Form.Control>
        </Form.Group>

        {/* 登録ボタン */}
        <Button disabled={isLoading} type="submit" variant="primary">
          登録
        </Button>

        {/* 登録中はローダーを表示 */}
        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          {/* 既にアカウントを持っているユーザーへのログインページリンク */}
          既にアカウントを持っている方はこちら→{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
