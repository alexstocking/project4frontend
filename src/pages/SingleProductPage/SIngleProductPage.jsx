import { useEffect } from "react";
import axios from 'axios'
import { useProducts } from "../../contexts/ProductContext";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { currencyFormatter } from "../../utilities/currencyFormatter"


export default function SingleProductPage() {
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundAttachment: "fixed",}}>
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text>Price: {formattedPrice}</Card.Text>
                            <Card.Text>Stock Left: {product.stock}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary" onClick={handleAddToCart} >Add to Cart</Button> &nbsp;
                            <Button variant="primary" onClick={handleAddToList} >Wish List</Button> &nbsp;
                            <Link to={'/products'} ><Button variant="secondary" >Back to Products</Button></Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>        
      </div>
  );
}