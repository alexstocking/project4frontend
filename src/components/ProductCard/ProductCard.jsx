import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { currencyFormatter } from "../../utilities/currencyFormatter"
import { useProducts } from '../../contexts/ProductContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import '../../App.css'
import Popup from "../Popup/Popup"


export default function ProductCard({id, name, price, image, tags, user}) {
    const formattedPrice = currencyFormatter.format(price)
    const { isUpdated, setIsUpdated, getSingleProduct, addToCart, addToList } = useProducts()
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const cartItem = {
        product: id,
        quantity: 1,
    }

    const listItem = {
        product: id,
        quantity: 1,
    }

    const handleAddToCart = async () => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/add/`, cartItem, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
            })
          if (response.ok) {
            // Update the cart in products context
            addToCart(id, 1);
            setShowPopup(true)
            setPopupMessage('Item added to the cart!')
            console.log('Item added to cart successfully');
          } else {
            setShowPopup(true)
            setPopupMessage('Item added to the cart!')
            console.error('Failed to add item to cart');
          }
        } catch (error) {
          console.error('Error adding item to cart:', error);
        }
      };

    const handleAddToList = async () => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/list/add/`, listItem, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
            })
          if (response.ok) {
            addToList(id, 1);
            setShowPopup(true);
            setPopupMessage('Item added to your wish list!');
            console.log('Item added to wish successfully');
          } else {
            setShowPopup(true);
            setPopupMessage('Item added to your wish list!');
            console.error('Failed to add item to wish list');
          }
        } catch (error) {
          console.error('Error adding item to wish list:', error);
        }
      };

    const closePopup = () => {
      setShowPopup(false);
      setPopupMessage('');
    };

    useEffect(() => {
        getSingleProduct(id)
        setIsUpdated(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isUpdated])

      return (
        <div className="font">
        <Card>
            <div className="image-container" style={{ height: "22vh", overflow: "hidden"}}>
              <Link to={`/products/${id}`} style={{ textDecoration: 'none'}}><Card.Img variant="top" src={image} alt={name} style={{ objectFit: "cover", height: "100%", width: '100%'}}/></Link>
            </div>
            <Link to={`/products/${id}`} style={{ textDecoration: 'none'}}><Card.Body style={{color: 'black'}}>
                <Card.Title>{name}</Card.Title>
                <Card.Text><strong>{formattedPrice}</strong></Card.Text>
            </Card.Body></Link>
              {user ? (
            <Card.Footer style={{lineHeight: '0.5em'}}>
                
                <Button variant="dark" onClick={handleAddToCart} >Add to Cart</Button> &nbsp;
                <Button variant="dark" onClick={handleAddToList} >Add to Wish List</Button> &nbsp;
            </Card.Footer>
              ) : (
                <></>
              )}
        </Card>
        {showPopup && <Popup message={popupMessage} onClose={closePopup} />} 
       
        </div>
    );
}


