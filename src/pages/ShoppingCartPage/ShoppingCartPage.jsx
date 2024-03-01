import { useEffect } from "react"
import { useProducts } from "../../contexts/ProductContext"
import { currencyFormatter } from '../../utilities/currencyFormatter'
import { Link } from 'react-router-dom'
import { Button, Image, Row, Col } from 'react-bootstrap'
import '../../App.css'
import './ShoppingCartPage.css'
import PersonalizationForm from "../../components/PersonalizationForm/PersonalizationForm"


export default function ShoppingCartPage({ user }) {
    const { carts, getShoppingCartProducts, removeFromCart } = useProducts()


    
    useEffect(() => {
        getShoppingCartProducts();
        console.log(userCart)
    // eslint-disable-next-line
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
        <div className="font">
            <h1>{user.first_name}'s Shopping Cart</h1>
            {userCart.length > 0 ? (
                <Row>
                    <Col xs={12} md={8}>
                        <ul className="cart-list">
                            {userCart.map((cart) =>
                                cart.cart_product.sort((a, b) => a.product.name.localeCompare(b.product.name)).map((cp) => {
                                    const formattedPrice = currencyFormatter.format(cp.product.price);
                                    return (
                                        <li key={cp.product.id} className="cart-item">
                                            <div className="product-info">
                                                <div className="product-image" style={{height: '30vh', width: '30vh', overflow: 'hidden', paddingTop: '2vh'}}>
                                                    <Link to={`/products/${cp.product.id}`} style={{ textDecoration: 'none' }}><Image src={cp.product.image} alt={cp.product.name} fluid /></Link>
                                                </div>
                                                <div className="product-details">
                                                    <Link to={`/products/${cp.product.id}`} style={{ textDecoration: 'none', color: 'black'}}><strong>{cp.product.name}</strong></Link>
                                                    <p>{formattedPrice}</p>
                                                </div>
                                            </div>
                                            <Button variant="danger" size="sm" onClick={() => handleRemoveFromCart(cp.id)}>
                                                Remove from Cart
                                            </Button>
                                        </li>
                                    );
                                })
                            )}
                        </ul>
                    </Col>
                    <Col xs={12} md={4}>
                        <PersonalizationForm userCart={userCart}/>
                        <br />
                        <div className="total-price">
                            <ul className="cart-list" style={{ listStyleType: 'none', padding: 0 }}>
                            {userCart.map((cart) =>
                                cart.cart_product.sort((a, b) => a.product.name.localeCompare(b.product.name)).map((cp) => {
                                    const formattedPrice = currencyFormatter.format(cp.product.price);
                                    return (
                                        <li key={cp.product.id} className="cart-item" style={{ margin: '5px 0', paddingLeft: 0 }}>
                                            <div className="product-info">
                                                <div className="product-details">
                                                    <h4><strong>{cp.product.name}</strong> : {formattedPrice}</h4>
                                                </div>
                                            </div>
                                            </li>
                                            );
                                        })
                                    )}
                                </ul>
                            <h2>Total Price: {currencyFormatter.format(calculateTotalPrice())}</h2>
                            <br />
                            <Button variant="dark" size='lg'>Proceed to Checkout</Button>
                        </div>
                    </Col>
                </Row>
            ) : (
                <p>No items in the shopping cart!</p>
            )}
            <Link to={'/products'}>
                <Button variant="dark">Back to Products</Button>
            </Link>
        </div>
    );
}