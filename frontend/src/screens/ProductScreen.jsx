import { useParams } from "react-router-dom"; // URLパラメータから商品IDを取得するためのフックをインポート
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { useGetProductDetailsQuery } from "../slices/productSlice"; // 商品の詳細情報を取得するためのRTK Queryフックをインポート
import Rating from "../components/Rating"; // 評価（Rating）を表示するためのコンポーネント
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const { id: productId } = useParams(); // useParamsフックでURLのパラメータから:idを取得し、productIdに格納

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
      )}
    </>
  );
};

export default ProductScreen;
