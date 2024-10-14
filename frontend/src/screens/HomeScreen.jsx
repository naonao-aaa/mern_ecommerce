import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product"; // Productコンポーネントをインポート
import axios from "axios"; // HTTPリクエストを行うためにaxiosをインポート

const HomeScreen = () => {
  const [products, setProducts] = useState([]); // productsのStateを管理。初期値は空の配列

  // useEffectフック：コンポーネントが最初にレンダリングされたときに一度だけ実行される
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products`); // データを取得（/api/products エンドポイントにGETリクエスト）
      setProducts(data); // 取得したデータを、productsのstateにセット
    };

    fetchProducts(); // fetchProducts関数を呼び出して商品データを取得
  }, []);

  return (
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
  );
};

export default HomeScreen;
