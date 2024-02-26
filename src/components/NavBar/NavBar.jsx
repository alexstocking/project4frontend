import { Navbar, Nav, Container } from 'react-bootstrap';
import { useState, useEffect } from "react"
import './NavBar.css'; // Import custom CSS for styling

export default function NavBar() {
  const [isAuth, setIsAuth] = useState(false)
  useEffect(() => {
    if (localStorage.getItem("access_token") !==null) {
      setIsAuth(true)
    }
  }, [isAuth])

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="custom-brand">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="custom-link">Home</Nav.Link>
            <Nav.Link href="/aboutus" className="custom-link">About Us</Nav.Link>
            <Nav.Link href="/contactus" className="custom-link">Contact Us</Nav.Link>
            <Nav.Link href="/products" className="custom-link">Products</Nav.Link>
          </Nav>
          <Nav>
            {isAuth ? (
              <Nav.Link href="/logout" className='custom-link'>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link href="/login" className='custom-link'>Login</Nav.Link>
                <Nav.Link href="/signup" className='custom-link'>Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}