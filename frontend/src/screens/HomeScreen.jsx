import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Product from "../components/Product"; // Productコンポーネントをインポート
import { useGetProductsQuery } from "../slices/productsApiSlice"; // RTK QueryのuseGetProductsQueryフックをインポート
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

const HomeScreen = () => {
  // URLパラメータからページ番号と検索キーワードを取得
  const { pageNumber, keyword } = useParams();
  // console.log(pageNumber);

  // 商品データを取得
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber, // ページ番号をパラメータとして渡す
    keyword, // 検索ワード
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>商品一覧</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""} // 検索キーワードがあれば渡す
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
