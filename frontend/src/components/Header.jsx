import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap"; // ナビゲーションバー関連のコンポーネントをインポート
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png"; // ロゴ画像をインポート
import { LinkContainer } from "react-router-bootstrap"; // React Router用のリンクコンテナ
import { useSelector } from "react-redux"; // Reduxのstateを取得するフック

const Header = () => {
  // Reduxのstateからカート内のアイテム情報を取得
  const { cartItems } = useSelector((state) => state.cart);
  // Reduxのstateからログイン中のユーザー情報を取得
  const { userInfo } = useSelector((state) => state.auth);

  // ログアウトボタンが押されたときの処理
  const logoutHandler = () => {
    console.log("logout");
  };

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

              {/* ユーザーがログインしているかどうかで表示を切り替え */}
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    {/* プロフィールページへのリンク */}
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    {/* ログアウトボタン */}
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                // ユーザーがログインしていない場合、ログインページへのリンクを表示
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
