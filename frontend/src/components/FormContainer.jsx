import { Container, Row, Col } from "react-bootstrap"; // React-Bootstrapからレイアウト用のコンポーネントをインポート

// フォームの中央寄せ用コンテナコンポーネント
const FormContainer = ({ children }) => {
  return (
    <Container>
      {/* BootstrapのContainerコンポーネントを使用して全体のレイアウトを調整 */}
      <Row className="justify-content-md-center">
        {/* Row（行）の中央にコンテンツを寄せるクラスを追加 */}
        <Col xs={12} md={6}>
          {/* 画面幅に応じてカラムサイズを設定。幅がxs（Extra Small）の場合は12、md（Medium）の場合は6 */}
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer; // 他のファイルで使用するためにエクスポート
