import { LinkContainer } from "react-router-bootstrap"; // React RouterとReact-Bootstrapの連携コンポーネント
import { Table, Button } from "react-bootstrap"; // BootstrapのTableとButtonコンポーネント
import { FaTimes } from "react-icons/fa"; // アイコン表示用のライブラリから"×"アイコンをインポート
import Message from "../../components/Message"; // エラーメッセージなどを表示するカスタムコンポーネント
import Loader from "../../components/Loader"; // 読み込み中状態を示すカスタムコンポーネント
import { useGetOrdersQuery } from "../../slices/orderApiSlice"; // 全注文データを取得するカスタムフック

const OrderListScreen = () => {
  // `useGetOrdersQuery`フックを使用して、注文データの取得・読み込み状態・エラー状態を取得
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1>Orders</h1>
      {/* データの読み込み状態を判定 */}
      {isLoading ? (
        // 読み込み中の場合、Loaderコンポーネントを表示
        <Loader />
      ) : error ? (
        // エラーが発生した場合、エラーメッセージをMessageコンポーネントで表示
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        // データの読み込みが成功した場合、注文一覧を表形式で表示
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            {/* テーブルのヘッダー部分 */}
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* orders配列をマッピングして各注文データをテーブル行に表示 */}
            {orders.map((order) => (
              <tr key={order._id}>
                {/* 各注文のIDを表示 */}
                <td>{order._id}</td>
                {/* 注文者の名前を表示（ユーザー情報が存在する場合） */}
                <td>{order.user && order.user.name}</td>
                {/* 注文日を表示（日時文字列の最初の10文字を抽出） */}
                <td>{order.createdAt.substring(0, 10)}</td>
                {/* 注文合計金額を表示 */}
                <td>${order.totalPrice}</td>
                {/* 支払い状態を表示 */}
                <td>
                  {order.isPaid ? (
                    // 支払済みの場合、支払い日を表示
                    order.paidAt.substring(0, 10)
                  ) : (
                    // 未払いの場合、赤い×アイコンを表示
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                {/* 配送状態を表示 */}
                <td>
                  {order.isDelivered ? (
                    // 配送済みの場合、配送日を表示
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    // 未配送の場合、赤い×アイコンを表示
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                {/* 詳細ボタンを表示 */}
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
