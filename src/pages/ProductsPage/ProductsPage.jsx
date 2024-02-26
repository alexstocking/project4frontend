import ProductCard from "../../components/ProductCard/ProductCard"
import { useEffect } from "react"
import { useProducts } from "../../contexts/ProductContext"

export default function ProductsPage() {
  const { products, getProducts, isUpdated } = useProducts()

  useEffect(() => {
    getProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated])

  return (
    products.map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        name={product.name}
        description={product.description}
        price={product.price}
        stock={product.stock}
        tags={product.tags}
      />
    ))
  )
}
