import { Navigate, Outlet } from "react-router-dom"; // React RouterからNavigateとOutletコンポーネントをインポート
import { useSelector } from "react-redux"; // Reduxストアの状態を取得するためのuseSelectorフックをインポート

const PrivateRoute = () => {
  // ReduxストアのauthスライスからuserInfoを取得
  const { userInfo } = useSelector((state) => state.auth);

  // userInfoがある場合はOutletコンポーネントをレンダリング
  // userInfoがない場合は"/login"ページにリダイレクト（replaceを指定して、リダイレクト後に戻る操作を防ぐ）
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute; // エクスポート
