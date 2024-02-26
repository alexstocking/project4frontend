import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage/HomePage.jsx"
import ProductsPage from "./pages/ProductsPage/ProductsPage.jsx"
import AboutPage from "./pages/AboutPage/AboutPage.jsx"
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage.jsx"
import NavBar from "./components/NavBar/NavBar.jsx";
import Logout from "./components/Logout/Logout.jsx";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import SingleProductPage from './pages/SingleProductPage/SIngleProductPage.jsx'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { getUser } from './utilities/users-service.js'

function App() {
  const [user, setUser] = useState(getUser())
  console.log(user)

  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <Routes>
          <Route path='/' element={ <HomePage /> }/>
          <Route path='/products' element={ <ProductsPage /> }/>
          <Route path='/products/:id' element={ <SingleProductPage />}/>
          <Route path='/aboutus' element={ <AboutPage /> }/>
          <Route path='/contactus' element={ <ContactUsPage /> }/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
