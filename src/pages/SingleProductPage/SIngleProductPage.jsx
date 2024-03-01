import { useEffect } from "react";
import axios from 'axios'
import { useProducts } from "../../contexts/ProductContext";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { currencyFormatter } from "../../utilities/currencyFormatter"
import '../../App.css'



export default function SingleProductPage({user}) {
    const {product, getSingleProduct, isUpdated, setIsUpdated, addToCart, addToList} = useProducts()
    const { id } = useParams()
    const formattedPrice = currencyFormatter.format(product.price)

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
      <div className ='font' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundAttachment: "fixed",}}>
        <Row className="justify-content-md-center">
            <Col md={4}>
                {/* Column for the image */}
                <Card>
                    <Card.Img src={product.image} alt={product.name} />
                </Card>
            </Col>
            <Col md={8}>
                {/* Column for product details */}
                <Card>
                    <Card.Body>
                        <Card.Title><strong>{product.name}</strong></Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        <Card.Text><strong>{formattedPrice}</strong></Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      {user ? (
                        <>
                        <Button variant="dark" onClick={handleAddToCart} >Add to Cart</Button> &nbsp;
                        <Button variant="dark" onClick={handleAddToList} >Wish List</Button> &nbsp;
                        <Link to={'/products'} ><Button variant="outline-dark" >Back to Products</Button></Link>
                        </>
                        ) : (
                          <Link to={'/products'} ><Button variant="outline-dark" >Back to Products</Button></Link>
                        )}
                    </Card.Footer>
                </Card>
            </Col>
        </Row>  
      </div>
  );
}