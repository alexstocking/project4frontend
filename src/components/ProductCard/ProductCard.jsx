import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { currencyFormatter } from "../../utilities/currencyFormatter"
import { useProducts } from '../../contexts/ProductContext'
import { useEffect } from 'react'


export default function ProductCard({id, name, price, tags}) {
    const formattedPrice = currencyFormatter.format(price)
    const { isUpdated, setIsUpdated, getSingleProduct } = useProducts()

    useEffect(() => {
        getSingleProduct(id)
        setIsUpdated(false)
        console.log(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isUpdated])

    return (
        <Card style={{ border: "2px solid #001F3F", borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", transition: "0.3s"}}>
        <Card.Body style={{ backgroundColor: "#001F3F", color: "#FFFFFF" }}>
          <Card.Title style={{ fontFamily: "Arial, sans-serif" }}>{name}</Card.Title>
          <Card.Text>{formattedPrice}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "#001F3F", borderTop: "1px solid #E6E6E6" }}>
          <Link to={`/products/${id}`} style={{ textDecoration: 'none' }}><Button variant="outline-light">Info</Button></Link>     
        </Card.Footer>
      </Card>
    )


}