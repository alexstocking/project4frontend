import ProductCard from "../../components/ProductCard/ProductCard"
import { useEffect } from "react"
import { useProducts } from "../../contexts/ProductContext"
import { Container } from "react-bootstrap"

export default function ProductsPage({user}) {
  const { products, getProducts, isUpdated } = useProducts()

  useEffect(() => {
    getProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated])

  return (
    <Container style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "1rem",
      alignItems: "flex-start"}}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          stock={product.stock}
          tags={product.tags}
          image={product.image}
          user={user}
        />
      ))}
    </Container>
  )
}
