import { useState } from "react"; // ReactのuseStateフックをインポート
import { Form, Button } from "react-bootstrap"; // BootstrapのFormコンポーネントをインポート
import { useDispatch, useSelector } from "react-redux"; // Reduxのdispatchとstateセレクタを使用
import { useNavigate } from "react-router-dom"; // ルーティング用のnavigate関数をインポート
import FormContainer from "../components/FormContainer"; // フォームを中央に配置するコンポーネントをインポート
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../slices/cartSlice"; // Reduxのアクションをインポート

const ShippingScreen = () => {
  // Reduxのcart状態を取得
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart; // 現在保存されている配送先情報を取得

  // フォームの各入力項目の状態を管理
  const [address, setAddress] = useState(shippingAddress?.address || ""); // 住所
  const [city, setCity] = useState(shippingAddress?.city || ""); // 市
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  ); // 郵便番号
  const [country, setCountry] = useState(shippingAddress?.country || ""); // 国

  const dispatch = useDispatch(); // Reduxのdispatch関数を取得
  const navigate = useNavigate(); // ページ遷移に使用

  // フォーム送信時の処理
  const submitHandler = (e) => {
    e.preventDefault(); // フォームのデフォルト動作をキャンセル
    // 入力された配送先情報をReduxの状態に保存
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    // 次のステップである「支払い」ページに遷移
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        {/* 住所の入力フォーム */}
        <Form.Group className="my-2" controlId="address">
          <Form.Label>住所</Form.Label>
          <Form.Control
            type="text" // 入力タイプを指定
            placeholder="Enter address" // プレースホルダーを表示
            value={address} // 現在の状態をフォームに反映
            required // 必須項目として設定
            onChange={(e) => setAddress(e.target.value)} // 入力が変わったときに状態を更新
          ></Form.Control>
        </Form.Group>

        {/* 市の入力フォーム */}
        <Form.Group className="my-2" controlId="city">
          <Form.Label>市</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* 郵便番号の入力フォーム */}
        <Form.Group className="my-2" controlId="postalCode">
          <Form.Label>郵便番号</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* 国の入力フォーム */}
        <Form.Group className="my-2" controlId="country">
          <Form.Label>国</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* 送信ボタン */}
        <Button type="submit" variant="primary">
          次へ
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
