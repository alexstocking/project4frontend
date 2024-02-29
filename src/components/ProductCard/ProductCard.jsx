import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { currencyFormatter } from "../../utilities/currencyFormatter"
import { useProducts } from '../../contexts/ProductContext'
import { useEffect } from 'react'
import axios from 'axios'


export default function ProductCard({id, name, price, image, tags, user}) {
    const formattedPrice = currencyFormatter.format(price)
    const { isUpdated, setIsUpdated, getSingleProduct, addToCart, addToList } = useProducts()

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
            console.log('Item added to cart successfully');
          } else {
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
            console.log('Item added to wish successfully');
          } else {
            console.error('Failed to add item to wish list');
          }
        } catch (error) {
          console.error('Error adding item to wish list:', error);
        }
      };

    useEffect(() => {
        getSingleProduct(id)
        setIsUpdated(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isUpdated])

      return (
        <Card>
            <div className="image-container" style={{ height: "22vh", overflow: "hidden"}}>
                <Card.Img variant="top" src={image} alt={name} style={{ objectFit: "contain", height: "100%"}}/>
            </div>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{formattedPrice}</Card.Text>
                <Card.Text>{tags.join(", ")}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="primary" onClick={handleAddToCart} >Add to Cart</Button> &nbsp;
                <Button variant="primary" onClick={handleAddToList} >Wish List</Button> &nbsp;
                <Link to={`/products/${id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="primary">Info</Button>
                </Link>
            </Card.Footer>
        </Card>
    );
}


