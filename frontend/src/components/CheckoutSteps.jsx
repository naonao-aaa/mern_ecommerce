import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// CheckoutStepsコンポーネントを定義
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    // 水平方向に並べるナビゲーションバーを作成
    <Nav className="justify-content-center mb-4">
      {/* 各ステップのナビゲーション項目を順に作成 */}
      <Nav.Item>
        {step1 ? ( // step1がtrueの場合
          <LinkContainer to="/login">
            {/* "/login"へのリンクを有効化 */}
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
          // step1がfalseの場合、リンクを無効化
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? ( // step2がtrueの場合
          <LinkContainer to="/shipping">
            {/* "/shipping"へのリンクを有効化 */}
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
          // step2がfalseの場合、リンクを無効化
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? ( // step3がtrueの場合
          <LinkContainer to="/payment">
            {/* "/payment"へのリンクを有効化 */}
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
          // step3がfalseの場合、リンクを無効化
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? ( // step4がtrueの場合
          <LinkContainer to="/placeorder">
            {/* "/placeorder"へのリンクを有効化 */}
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
          // step4がfalseの場合、リンクを無効化
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps; // エクスポート
