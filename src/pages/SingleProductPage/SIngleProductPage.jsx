import { useEffect } from "react";
import { useProducts } from "../../contexts/ProductContext";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { currencyFormatter } from "../../utilities/currencyFormatter"


export default function SingleProductPage() {
    const {product, getSingleProduct, isUpdated, setIsUpdated} = useProducts()
    const { id } = useParams()
    const formattedPrice = currencyFormatter.format(product.price)


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
                            <Link to={'/products'} ><Button variant="secondary" >Back to Products</Button></Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>        
      </div>
  );
}