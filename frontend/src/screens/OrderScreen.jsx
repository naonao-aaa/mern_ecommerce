import { Link, useParams } from "react-router-dom"; // React RouterのLinkとuseParamsをインポート
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap"; // レイアウトとスタイリング用のBootstrapコンポーネント
import Message from "../components/Message"; // メッセージ表示用のコンポーネント
import Loader from "../components/Loader"; // ローディング状態を表示するコンポーネント
import { useGetOrderDetailsQuery } from "../slices/orderApiSlice"; // APIから注文詳細を取得するためのフックをインポート

const OrderScreen = () => {
  // React RouterからURLパラメータ（注文ID）を取得
  const { id: orderId } = useParams();

  // APIから注文詳細を取得するためのフックを使用
  const {
    data: order, // 取得した注文データ
    isLoading, // ローディング中であるかを示すフラグ
    error, // エラーメッセージ
  } = useGetOrderDetailsQuery(orderId); // orderIdを引数に渡して注文詳細を取得

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
