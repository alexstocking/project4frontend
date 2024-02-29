import { useContext, createContext, useState } from "react"
import axios from "axios"

const ProductContext = createContext()

export function useProducts() {
    return useContext(ProductContext)
}

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})
    const [isUpdated, setIsUpdated] = useState(false)
    const [carts, setCarts] = useState([])
    const [cart, setCart] = useState([])
    const [lists, setLists] = useState([])
    const [list, setList] = useState([])
    const [requests, setRequests] = useState([])
    
    async function getShoppingCartProducts() {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/carts/`)
        .then(response => {
            setCarts(response.data)
        })
        .catch(error => console.error("Error fetching carts", error)) 
    }

    async function getWishListProducts() {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/lists/`)
        .then(response => {
            setLists(response.data)
        })
        .catch(error => console.error("Error fetching lists", error)) 
    }
    
    async function getProducts() {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/`)
        .then(response => {
            setProducts(response.data)
        })
        .catch(error => console.error("Error fetching products", error))
    }

    async function getRequests() {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/requests/`)
        .then(response => {
            setRequests(response.data)
        })
        .catch(error => console.error("Error fetching products", error))
    }

    function getSingleProduct(productId) {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}/`)
        .then(response => { 
            setProduct(response.data)
        })
        .catch(error => console.error("Error fetching single product", error))
    }

    const addToCart = (productId, quantity) => {
        setCart([...cart, { productId, quantity }]);
      };

    async function removeFromCart(cartProductId) {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/cart/remove/${cartProductId}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            // Optionally, update local state or trigger a re-fetch of shopping cart data
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    }

    const addToList = (productId, quantity) => {
        setList([...list, { productId, quantity }]);
      };

    async function removeFromList(listProductId) {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/list/remove/${listProductId}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
        } catch (error) {
            console.error('Error removing product from list:', error);
        }
    }


    return (
        <ProductContext.Provider value={{
            product,
            products,
            cart,
            carts,
            list,
            lists,
            requests,
            getProducts,
            getSingleProduct,
            getShoppingCartProducts,
            getWishListProducts,
            getRequests,
            addToCart,
            removeFromCart,
            addToList,
            removeFromList,
            isUpdated,
            setIsUpdated
        }}>
            {children}
        </ProductContext.Provider>
    )
}
