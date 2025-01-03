import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";

const ProductListScreen = () => {
  // 商品リストを取得するためのカスタムフック
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("本当に削除して良いですか？")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("新しい製品を作成してもよろしいですか?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      {/* 上部の行: タイトルと「新規商品作成」ボタン */}
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1> {/* ページタイトル */}
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <FaPlus /> Create Product {/* 商品作成ボタン */}
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {/* データの状態による条件分岐 */}
      {isLoading ? (
        // ローディング中はスピナーを表示
        <Loader />
      ) : error ? (
        // エラーがある場合はエラーメッセージを表示
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* 商品リストをテーブル形式で表示 */}
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th> {/* 商品ID */}
                <th>NAME</th> {/* 商品名 */}
                <th>PRICE</th> {/* 価格 */}
                <th>CATEGORY</th> {/* カテゴリ */}
                <th>BRAND</th> {/* ブランド */}
                <th></th> {/* アクション用の空の列 */}
              </tr>
            </thead>
            <tbody>
              {/* サーバーから取得した商品のリストを表示 */}
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td> {/* 商品ID */}
                  <td>{product.name}</td> {/* 商品名 */}
                  <td>{product.price}円</td> {/* 価格 */}
                  <td>{product.category}</td> {/* カテゴリ */}
                  <td>{product.brand}</td> {/* ブランド */}
                  <td>
                    {/* 編集ボタン */}
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit /> {/* 編集アイコン */}
                      </Button>
                    </LinkContainer>
                    {/* 削除ボタン */}
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)} // 削除処理を実行
                    >
                      <FaTrash style={{ color: "white" }} />{" "}
                      {/* 削除アイコン */}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* ページネーション */}
          {/* PAGINATE PLACEHOLDER */}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
