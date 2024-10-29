import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import { useGetProductDetailsQuery } from "../slices/productApiSlice"; // 商品の詳細情報を取得するためのRTK Queryフックをインポート
import Rating from "../components/Rating"; // 評価（Rating）を表示するためのコンポーネント
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice"; // カートに商品を追加するためのアクションをインポート

const ProductScreen = () => {
  const { id: productId } = useParams(); // useParamsフックでURLのパラメータから:idを取得し、productIdに格納

  const dispatch = useDispatch(); // Reduxのアクションをディスパッチするためのフック
  const navigate = useNavigate(); // ページ遷移を行うためのフック

  const [qty, setQty] = useState(1); // 商品の数量を管理するstate

  // 商品をカートに追加するハンドラー関数
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty })); // 商品情報と選択した数量をdispatchでcartに追加
    navigate("/cart"); // カートページに遷移
  };

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId); // 商品IDを使って商品詳細を取得

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        戻る
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>価格: {product.price}円</ListGroup.Item>
                <ListGroup.Item>説明: {product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>価格:</Col>
                      <Col>
                        <strong>{product.price}円</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>在庫:</Col>
                      <Col>
                        {product.countInStock > 0 ? "在庫あり" : "在庫なし"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* 在庫がある場合は数量選択を表示 */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>数量</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(parseInt(e.target.value))} // 数量変更時にstateを更新。// parseIntで数値型に変換
                          >
                            {/* 在庫数分の選択肢を生成 */}
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler} // クリックでaddToCartHandlerを呼び出し
                    >
                      カートに追加
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
