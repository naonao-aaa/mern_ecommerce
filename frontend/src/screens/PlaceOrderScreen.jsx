import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // React Routerを使用するための関数をインポート
import { toast } from "react-toastify"; // 通知表示用のライブラリ
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap"; // Bootstrapのコンポーネント
import { useDispatch, useSelector } from "react-redux"; // Reduxのdispatchとstateセレクターを使用
import Message from "../components/Message"; // カスタムメッセージコンポーネント
import CheckoutSteps from "../components/CheckoutSteps"; // チェックアウトステップを表示するコンポーネント
import Loader from "../components/Loader"; // ローディングスピナーコンポーネント
import { useCreateOrderMutation } from "../slices/orderApiSlice"; // orderApiSliceからのカスタムフック
import { clearCartItems } from "../slices/cartSlice"; // カートをクリアするためのアクション

const PlaceOrderScreen = () => {
  const navigate = useNavigate(); // ルーティングをプログラム的に制御するためのフック

  const cart = useSelector((state) => state.cart); // Reduxストアからカート情報を取得

  // useCreateOrderMutation: 注文作成API呼び出し用のカスタムフック
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    // 必須情報がない場合は該当ページにリダイレクト
    if (!cart.shippingAddress.address) {
      navigate("/shipping"); // 配送先住所がない場合は配送ページへ
    } else if (!cart.paymentMethod) {
      navigate("/payment"); // 支払い方法がない場合は支払いページへ
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch(); // Reduxアクションを呼び出すための関数

  // 注文を確定するための関数
  const placeOrderHandler = async () => {
    try {
      // APIを呼び出して注文を作成
      const res = await createOrder({
        orderItems: cart.cartItems, // カート内のアイテム
        shippingAddress: cart.shippingAddress, // 配送先住所
        paymentMethod: cart.paymentMethod, // 支払い方法
        itemsPrice: cart.itemsPrice, // 商品合計金額
        shippingPrice: cart.shippingPrice, // 配送料
        taxPrice: cart.taxPrice, // 税金
        totalPrice: cart.totalPrice, // 合計金額
      }).unwrap(); // unwrapでエラー処理を簡略化
      dispatch(clearCartItems()); // カートの中身をリセット
      navigate(`/order/${res._id}`); // 作成した注文の詳細ページにリダイレクト
    } catch (err) {
      toast.error(err); // エラーをトースト通知で表示
    }
  };

  return (
    <>
      {/* チェックアウトの進捗を表示 */}
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>配達先</h2>
              <p>
                <strong>住所:</strong>
                {/* 配送先住所を表示 */}
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>支払い方法</h2>
              {/* <strong>支払い方法: </strong> */}
              {/* 支払い方法を表示 */}
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>注文商品</h2>
              {/* カートが空の場合のメッセージ表示 */}
              {cart.cartItems.length === 0 ? (
                <Message>カートは空です。</Message>
              ) : (
                <ListGroup variant="flush">
                  {/* カート内の各商品を表示 */}
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          {/* 商品画像を表示 */}
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          {/* 商品名をリンクとして表示 */}
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {/* 商品の数量、価格、合計を表示 */}
                          {item.qty} x {item.price}円 = {item.qty * item.price}
                          円
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>注文合計</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>商品合計金額</Col>
                  {/* 商品合計金額 */}
                  <Col>{cart.itemsPrice}円</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>配送料</Col>
                  {/* 配送料 */}
                  <Col>{cart.shippingPrice}円</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>税金</Col>
                  {/* 税金 */}
                  <Col>{cart.taxPrice}円</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>合計金額</Col>
                  {/* 合計金額 */}
                  <Col>{cart.totalPrice}円</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {/* エラーがある場合のメッセージ */}
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                {/* 注文ボタン */}
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0} // カートが空ならボタンを無効化
                  onClick={placeOrderHandler} // クリックで注文処理を実行
                >
                  注文を確定する
                </Button>
                {/* ローディングスピナー */}
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
