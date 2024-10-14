import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating"; // 評価（Rating）を表示するためのコンポーネント
import axios from "axios";

const ProductScreen = () => {
  const { id: productId } = useParams(); // useParamsフックでURLのパラメータから:idを取得し、productIdに格納
  const [product, setProduct] = useState({}); // 商品の情報を格納するためのproductのState。初期値は空のオブジェクト

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`); // 商品詳細を取得（APIのURLに商品IDを指定）
      setProduct(data); // 取得したデータをproduct Stateにセット
    };

    fetchProduct(); // fetchProduct関数を実行して商品データを取得
  }, [productId]);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        戻る
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
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

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  カートに追加
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
