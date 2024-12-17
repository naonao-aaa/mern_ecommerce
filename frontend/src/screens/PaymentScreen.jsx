import { useState, useEffect } from "react"; // ReactのuseStateとuseEffectフックをインポート
import { Form, Button, Col } from "react-bootstrap"; // Bootstrapのコンポーネントをインポート
import { useNavigate } from "react-router-dom"; // React Routerのnavigate関数をインポート
import { useDispatch, useSelector } from "react-redux"; // Reduxのdispatchとstateセレクタを使用
import FormContainer from "../components/FormContainer"; // フォームを中央に配置するコンポーネントをインポート
import CheckoutSteps from "../components/CheckoutSteps"; // チェックアウトのステップを表示するコンポーネントをインポート
import { savePaymentMethod } from "../slices/cartSlice"; // 支払い方法を保存するアクションをインポート

const PaymentScreen = () => {
  const navigate = useNavigate(); // ページ遷移を行うための関数を取得
  const cart = useSelector((state) => state.cart); // Reduxストアからカートの状態を取得
  const { shippingAddress } = cart; // カートから配送先住所を取得

  useEffect(() => {
    // 配送先住所がない場合、Shippingページにリダイレクト
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]); // shippingAddressの変更を監視して実行

  const [paymentMethod, setPaymentMethod] = useState("PayPal"); // 支払い方法の状態を管理するステート（初期値は"PayPal"）

  const dispatch = useDispatch(); // Reduxのアクションをディスパッチするための関数を取得

  const submitHandler = (e) => {
    e.preventDefault(); // フォームのデフォルト動作（ページリロード）を防止
    dispatch(savePaymentMethod(paymentMethod)); // 支払い方法をReduxの状態に保存
    navigate("/placeorder"); // 次のステップであるPlaceOrderページに遷移
  };

  return (
    <FormContainer>
      {/* チェックアウトステップを表示する（step1, step2, step3を完了としてマーク） */}
      <CheckoutSteps step1 step2 step3 />
      <h1>お支払い方法</h1>
      <Form onSubmit={submitHandler}>
        {/* 支払い方法を選択するフォーム */}
        <Form.Group>
          <Form.Label as="legend">お支払い方法をお選びください</Form.Label>
          <Col>
            <Form.Check
              className="my-2"
              type="radio" // ラジオボタン形式で表示
              label="PayPal or Credit Card" // ラベルを表示
              id="PayPal" // ラジオボタンのID
              name="paymentMethod" // ラジオボタンのグループ名
              value="PayPal" // ラジオボタンの値
              checked // 初期状態で選択済みに設定
              onChange={(e) => setPaymentMethod(e.target.value)} // 値が変更されたとき、ステートを更新
            ></Form.Check>
          </Col>
        </Form.Group>

        {/* 続行ボタン */}
        <Button type="submit" variant="primary">
          次へ
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen; // エクスポート
