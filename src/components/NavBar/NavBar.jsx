import { Navbar, Nav, Container } from 'react-bootstrap';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css';

// Import your logo from the assets folder
import logo from '../../assets/Final.png'


export default function NavBar({ user }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  function checkScreenSize() {
    setIsSmallScreen(window.innerWidth < 768);
  }

  window.addEventListener('resize', checkScreenSize);

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#8A9A5B', height: '20vh', marginBottom: '10vh' }}>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Container fluid className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/" className="custom-brand d-flex align-items-center justify-content-center">
          <img src={logo} alt="Logo" height="250vh" style={{ border: '1px transparent', borderRadius: '50%', marginTop: '10vh'}}/> {/* Adjust height as needed */}
        </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
          {isSmallScreen ? (
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
              <Nav.Link as={Link} to="/contactus">Contact Us</Nav.Link>
              <Nav.Link as={Link} to="/products">Products</Nav.Link>
            </Nav>
          ) : (
            <Nav className="me-auto BLUE" style={{display: 'flex', width: '100%', justifyContent: 'space-between', paddingTop: '15vh'}}>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contactus">Contact Us</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
          </Nav>
          )}
        <Nav className="RED">
          {user ? (
            <>
              <Nav.Link href="/wishlist">
                    <img
                      src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/add-to-wishlist-icon.png"
                      width="40vh"
                      height="35vh"
                      className="d-inline-block align-top"
                      alt="Shopping cart logo"
                    />
              </Nav.Link>
              <Nav.Link href="/cart">
                    <img
                      src="https://www.shareicon.net/data/2016/02/07/281223_cart_512x512.png"
                      width="40vh"
                      height="35vh"
                      className="d-inline-block align-top"
                      alt="Shopping cart logo"
                    />
              </Nav.Link>
              &nbsp;
              &nbsp;
              <Nav.Link as={Link} to="/account">{user.first_name}</Nav.Link>
              &nbsp;
              &nbsp;
              <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            </>
          )}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}