import { Link, useNavigate } from "react-router-dom"; // ページ遷移とリンク用のReact Routerコンポーネントをインポート
import { useDispatch, useSelector } from "react-redux"; // Reduxのディスパッチと状態取得フックをインポート
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap"; // レイアウトとスタイルのためのReact Bootstrapコンポーネント
import { FaTrash } from "react-icons/fa"; // ゴミ箱アイコンのインポート
import Message from "../components/Message"; // メッセージ表示用コンポーネントのインポート
import { addToCart, removeFromCart } from "../slices/cartSlice"; // カートに商品を追加するアクションのインポート

const CartScreen = () => {
  const navigate = useNavigate(); // ページ遷移用の関数
  const dispatch = useDispatch(); // Reduxのアクションをディスパッチするための関数
  const cart = useSelector((state) => state.cart); // Reduxストアのカート状態を取得
  const { cartItems } = cart; // カートアイテムの配列を取り出し

  // カートの数量を変更するハンドラー関数
  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty })); // 新しい数量でカートに追加
  };

  // カートから商品を削除するハンドラー関数
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // レジに進むボタンをクリックした際のハンドラー関数
  const checkoutHandler = () => {
    // ログインしていない場合は、ログインページにリダイレクトし、ログイン後は配送情報ページに遷移
    navigate("/login?redirect=/shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>ショッピングカート</h1>
        {/* カートが空かどうかの確認 */}
        {cartItems.length === 0 ? (
          <Message>
            カートは空です <Link to="/">戻る</Link>
          </Message>
        ) : (
          // カートにアイテムがある場合はそれをリストで表示
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  {/* 商品の画像を表示 */}
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  {/* 商品名へのリンク */}
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  {/* 商品の価格を表示 */}
                  <Col md={2}>{item.price}円</Col>
                  {/* 数量選択メニュー */}
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={
                        (e) => addToCartHandler(item, Number(e.target.value)) // 数量変更時にaddToCartHandlerを呼び出し
                      }
                    >
                      {/* 在庫数に応じた選択肢を生成 */}
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  {/* 削除ボタン */}
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        {/* 合計金額やチェックアウトボタンの表示 */}
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                小計：{cartItems.reduce((acc, item) => acc + item.qty, 0)}点
              </h2>
              {/* 合計金額を計算して表示 */}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(0)}
              円
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                レジに進む
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
