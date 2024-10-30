import { Navbar, Nav, Container, Badge } from "react-bootstrap"; // ナビゲーションバー関連のコンポーネントをインポート
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png"; // ロゴ画像をインポート
import { LinkContainer } from "react-router-bootstrap"; // React Router用のリンクコンテナ
import { useSelector } from "react-redux"; // Reduxのstateを取得するフック

const Header = () => {
  // Reduxのstateからカートのアイテムを取得
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="NaoShop" />
              NaoShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {/* カートにアイテムがある場合、バッジを表示 */}
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {/* カート内の全アイテムの数量を合計し、バッジに表示 */}
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link href="/login">
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
