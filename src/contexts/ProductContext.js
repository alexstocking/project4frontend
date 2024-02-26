import { useContext, createContext, useState } from "react"
import axios from "axios"

const ProductContext = createContext()

export function useProducts() {
    return useContext(ProductContext)
}

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})
    const [isUpdated, setIsUpdated] = useState()

    function getProducts() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/`)
        .then(response => {
            setProducts(response.data)
        })
        .catch(error => console.error("Error fetching products", error))
    }

    function getSingleProduct(productId) {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}`)
        .then(response => { 
            setProduct(response.data)
        })
        .catch(error => console.error("Error fetching single product", error))
    }


    return (
        <ProductContext.Provider value={{
            product,
            products,
            getProducts,
            getSingleProduct,
            isUpdated,
            setIsUpdated
        }}>
            {children}
        </ProductContext.Provider>
    )
}