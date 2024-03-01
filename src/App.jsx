import { useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage/HomePage.jsx"
import ProductsPage from "./pages/ProductsPage/ProductsPage.jsx"
import AboutPage from "./pages/AboutPage/AboutPage.jsx"
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Logout from "./components/Logout/Logout.jsx";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import AccountPage from "./pages/AccountPage/AccountPage.jsx"
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage.jsx'
import SingleProductPage from './pages/SingleProductPage/SIngleProductPage.jsx'
import WishListPage from './pages/WishListPage/WishListPage.jsx'
import RequestPage from './pages/RequestPage/RequestPage.jsx'
import EditAccountPage from './pages/EditAccountPage/EditAccountPage.jsx'
import EditRequestPage from './pages/EditRequestPage/EditRequestPage.jsx'
import { Container } from 'react-bootstrap'
import './App.css'
import { useState } from 'react'
import axios from 'axios'


function App() {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  async function getUser() {
    try {
      // Fetch access token from local storage
      const accessToken = localStorage.getItem('access_token')
      if (accessToken) {
        // Include access token in request headers
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/current_user/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
        setLoading(false)
      } else {
        setLoading(false) // No access token found
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      setLoading(false)
    }
  };

  useEffect(() => {
    getUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BrowserRouter>
    <div className='app-container'>
      <NavBar user={user} />
      <Container>
        {loading ? (
          <p>Loading... </p>
        ): (
        <Routes className='font'>
          <Route path='/' element={ <HomePage /> }/>
          <Route path='/products' element={ <ProductsPage user={user}/> }/>
          <Route path='/products/:id' element={ <SingleProductPage user={user} />}/>
          <Route path='/aboutus' element={ <AboutPage /> }/>
          <Route path='/account' element={ <AccountPage user={user} /> }/>
          <Route path='/cart' element={ <ShoppingCartPage user={user}/> }/>
          <Route path='/wishlist' element={ <WishListPage user={user}/> }/>
          <Route path='/request' element={ <RequestPage user={user}/> }/>
          <Route path='/request/edit/:requestId' element={ <EditRequestPage user={user}/> }/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/account/edit" element={<EditAccountPage user={user}/>} />
        </Routes>
        )}
      </Container>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;