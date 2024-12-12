import { useEffect } from "react";
import { Link, useParams } from "react-router-dom"; // React RouterのLinkとuseParamsをインポート
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap"; // レイアウトとスタイリング用のBootstrapコンポーネント
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message"; // メッセージ表示用のコンポーネント
import Loader from "../components/Loader"; // ローディング状態を表示するコンポーネント
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
} from "../slices/orderApiSlice";

const OrderScreen = () => {
  // React RouterからURLパラメータ（注文ID）を取得
  const { id: orderId } = useParams();

  // APIから注文詳細を取得するためのフックを使用
  const {
    data: order, // 取得した注文データ
    refetch,
    isLoading, // ローディング中であるかを示すフラグ
    error, // エラーメッセージ
  } = useGetOrderDetailsQuery(orderId); // orderIdを引数に渡して注文詳細を取得

  // 注文の支払いを処理するためのカスタムフックを使用
  // `payOrder`関数を呼び出すことで、APIリクエストを送信し支払い処理を実行
  // `loadingPay`は支払い処理中であるかを示すフラグ（trueの場合、処理中）
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  // Reduxストアの`auth`スライスから現在ログインしているユーザー情報を取得
  // `userInfo`にはユーザーの詳細情報が含まれる
  const { userInfo } = useSelector((state) => state.auth);

  // PayPalスクリプトの状態を管理するためのカスタムフックを使用
  // `paypalDispatch`を使用してスクリプトの状態や設定を変更可能
  // `isPending`はスクリプトがロード中であるかを示すフラグ
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // PayPalクライアントIDを取得するためのカスタムフックを使用
  // `paypal`には取得したクライアントIDが含まれる
  // `loadingPayPal`はクライアントIDを取得中であるかを示すフラグ
  // `errorPayPal`は取得エラーが発生した場合にエラーメッセージが格納される
  const {
    data: paypal, // PayPalクライアントIDを格納
    isLoading: loadingPayPal, // データ取得中の状態を示す
    error: errorPayPal, // エラー情報を格納
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    // PayPalのクライアントIDがロードされ、エラーやローディング中でない場合に処理を実行
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      // 非同期関数を宣言
      const loadPaypalScript = async () => {
        // PayPalスクリプトのオプションをリセットして再設定
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId, // 取得したクライアントIDを設定
            currency: "JPY", // 通貨をJPYに設定
          },
        });
        // スクリプトのローディング状態を「pending」に設定
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      // 注文が存在し、まだ支払いが完了していない場合にPayPalスクリプトをロード
      if (order && !order.isPaid) {
        if (!window.paypal) {
          // PayPalのグローバルオブジェクトが未定義であればスクリプトをロード
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]); // 依存配列：これらの値が変更された際に再実行

  // UIの条件分岐: ローディング中、エラー時、正常時
  return isLoading ? (
    <Loader /> // ローディング中はLoaderコンポーネントを表示
  ) : error ? (
    <Message variant="danger">{error}</Message> // エラー時はエラーメッセージを表示
  ) : (
    <>
      {/* 注文番号を表示 */}
      <h1>注文番号 {order._id}</h1>
      <Row>
        {/* 左側のカラム: 注文情報 */}
        <Col md={8}>
          <ListGroup variant="flush">
            {/* 配送情報 */}
            <ListGroup.Item>
              <h2>配送情報</h2>
              <p>
                <strong>Name: </strong> {order.user.name} {/* 注文者の名前 */}
              </p>
              <p>
                <strong>Email: </strong> {/* 注文者のメールアドレス */}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>配送先住所:</strong> {/* 配送先住所 */}
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? ( // 配送状況に応じてメッセージを表示
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            {/* 支払い情報 */}
            <ListGroup.Item>
              <h2>支払い方法</h2>
              <p>
                {order.paymentMethod} {/* 支払い方法 */}
              </p>
              {order.isPaid ? ( // 支払い状況に応じてメッセージを表示
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            {/* 注文商品の一覧 */}
            <ListGroup.Item>
              <h2>注文商品</h2>
              {order.orderItems.length === 0 ? (
                <Message>注文商品はございません。</Message> // 商品がない場合のメッセージ
              ) : (
                <ListGroup variant="flush">
                  {/* 注文商品の詳細を表示 */}
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />{" "}
                          {/* 商品画像 */}
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          {/* 商品名とリンク */}
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price}円 = {item.qty * item.price}
                          円 {/* 数量と価格 */}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* 右側のカラム: 注文のサマリー */}
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>注文合計</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>商品合計金額</Col>
                  <Col>{order.itemsPrice}円</Col> {/* 商品の合計金額 */}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>配送料</Col>
                  <Col>{order.shippingPrice}円</Col> {/* 配送料 */}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>税金</Col>
                  <Col>{order.taxPrice}円</Col> {/* 税金 */}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>合計金額</Col>
                  <Col>{order.totalPrice}円</Col> {/* 合計金額 */}
                </Row>
              </ListGroup.Item>
              {/* 支払いや配送完了のボタンを追加する場所 */}
              {/* {MARK AS DELIVERED PLACEHOLDER} */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
