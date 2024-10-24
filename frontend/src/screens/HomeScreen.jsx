import { Row, Col } from "react-bootstrap";
import Product from "../components/Product"; // Productコンポーネントをインポート
import { useGetProductsQuery } from "../slices/productSlice"; // RTK QueryのuseGetProductsQueryフックをインポート

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery(); // 商品データを取得

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error?.data.message || error.error}</div>
      ) : (
        <>
          <h1>商品一覧</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
