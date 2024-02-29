import { useEffect } from "react"
import { useProducts } from "../../contexts/ProductContext"
import { currencyFormatter } from '../../utilities/currencyFormatter'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function ShoppingCartPage({ user }) {
    const { carts, getShoppingCartProducts, removeFromCart } = useProducts()
    
    useEffect(() => {
        getShoppingCartProducts();
        console.log(userCart)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const userCart = carts.filter(cart => cart.user === user.id);

    const handleRemoveFromCart = (cartProductId) => {
        removeFromCart(cartProductId);
        window.location.href='/cart'
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        userCart.forEach(cart => {
            cart.cart_product.forEach(cp => {
                totalPrice += cp.product.price;
            });
        });
        return totalPrice;
    };

    return (
        <>
            <h1>{user.first_name}'s Shopping Cart</h1>
            {userCart.length > 0 ? (
                <>
                    <ul>
                        {userCart.map(cart => (
                            cart.cart_product.sort((a, b) => a.product.name.localeCompare(b.product.name))
                                .map(cp => {
                                    const formattedPrice = currencyFormatter.format(cp.product.price);
                                    return (
                                        <li key={cp.product.id}>
                                            <strong>{cp.product.name}</strong>
                                            <p>{formattedPrice}</p>
                                            <Button variant="danger" onClick={() => handleRemoveFromCart(cp.id)}>Remove</Button>
                                        </li>
                                    );
                                })
                        ))}
                    </ul>
                    <p>Total Price: {currencyFormatter.format(calculateTotalPrice())}</p>
                </>
            ) : (
                    <p>No items in the shopping cart!</p>
                )}
            <Link to={'/products'} ><Button variant="secondary" >Back to Products</Button></Link>
        </>
    );
}