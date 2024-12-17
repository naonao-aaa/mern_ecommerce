import React, { useEffect, useState } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap"; // UIコンポーネントのインポート
import { LinkContainer } from "react-router-bootstrap"; // ルーティングをサポートするコンポーネント
import { useDispatch, useSelector } from "react-redux"; // Reduxのステート管理用フック
import { FaTimes } from "react-icons/fa"; // アイコン（×マーク）を表示するためのライブラリ
import { toast } from "react-toastify"; // 通知メッセージ表示用ライブラリ
import Message from "../components/Message"; // カスタムメッセージコンポーネント
import Loader from "../components/Loader"; // 読み込み中スピナーコンポーネント
import { useProfileMutation } from "../slices/userApiSlice"; // プロフィール更新用のRTK Queryミューテーション
import { useGetMyOrdersQuery } from "../slices/orderApiSlice"; // ユーザーの注文一覧取得用のRTK Query
import { setCredentials } from "../slices/authSlice"; // 認証情報を更新するアクション

const ProfileScreen = () => {
  // プロフィールフォームの状態管理
  const [name, setName] = useState(""); // ユーザー名の状態
  const [email, setEmail] = useState(""); // メールアドレスの状態
  const [password, setPassword] = useState(""); // パスワードの状態
  const [confirmPassword, setConfirmPassword] = useState(""); // パスワード確認用の状態

  // Reduxから現在ログイン中のユーザー情報を取得
  const { userInfo } = useSelector((state) => state.auth);

  // ユーザーの注文情報を取得
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  // プロフィール更新用のミューテーションを作成
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  // ユーザー情報が変更された場合にフォームの初期値を設定
  useEffect(() => {
    setName(userInfo.name); // 現在のユーザー名をフォームにセット
    setEmail(userInfo.email); // 現在のメールアドレスをフォームにセット
  }, [userInfo.email, userInfo.name]);

  const dispatch = useDispatch(); // Reduxのアクションを発火するための関数

  // プロフィール更新フォームの送信処理
  const submitHandler = async (e) => {
    e.preventDefault(); // ページリロードを防ぐ
    if (password !== confirmPassword) {
      // パスワードが一致しない場合はエラーメッセージを表示
      toast.error("Passwords do not match");
    } else {
      try {
        // プロフィール更新APIを呼び出し
        const res = await updateProfile({
          _id: userInfo._id, // ユーザーID
          name, // 更新後の名前
          email, // 更新後のメールアドレス
          password, // 更新後のパスワード
        }).unwrap(); // unwrapでエラーハンドリングを容易に
        // 更新後の認証情報をReduxのステートに保存
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully"); // 成功メッセージを表示
      } catch (err) {
        // エラーメッセージを表示
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Row>
      {/* プロフィール更新フォーム */}
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={submitHandler}>
          {/* 名前フィールド */}
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)} // 入力値を更新
            ></Form.Control>
          </Form.Group>

          {/* メールアドレスフィールド */}
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // 入力値を更新
            ></Form.Control>
          </Form.Group>

          {/* パスワードフィールド */}
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 入力値を更新
            ></Form.Control>
          </Form.Group>

          {/* パスワード確認フィールド */}
          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // 入力値を更新
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>

      {/* ユーザーの注文一覧 */}
      <Col md={9}>
        <h2>My Orders</h2>
        {isLoading ? (
          <Loader /> // 読み込み中のスピナー
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Table striped table hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  {/* 各注文の情報をテーブルに表示 */}
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10) // 支払済みの場合、支払い日を表示
                    ) : (
                      <FaTimes style={{ color: "red" }} /> // 未支払いの場合、赤い×マークを表示
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10) // 配送済みの場合、配送日を表示
                    ) : (
                      <FaTimes style={{ color: "red" }} /> // 未配送の場合、赤い×マークを表示
                    )}
                  </td>
                  <td>
                    {/* 注文詳細へのリンク */}
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
