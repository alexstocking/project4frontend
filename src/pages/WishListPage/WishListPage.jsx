import { useEffect, useState } from "react";
import { useProducts } from "../../contexts/ProductContext";
import { currencyFormatter } from '../../utilities/currencyFormatter';
import { Link } from 'react-router-dom';
import { Button, Image, Row, Col } from 'react-bootstrap';
import axios from "axios";
import '../../App.css';
import Popup from "../../components/Popup/Popup";

export default function WishListPage({ user }) {
    const { lists, getWishListProducts, removeFromList, addToCart} = useProducts();
    const [userList, setUserList] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        getWishListProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setUserList(lists.filter(list => list.user === user.id));
    }, [lists, user.id]);

    const handleRemoveFromList = (listProductId) => {
        removeFromList(listProductId);
        window.location.href='/wishlist'
    };

    const handleAddToCart = async (productId) => {
        const cartItem = {
            product: productId,
            quantity: 1,
        }

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/add/`, cartItem, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
            })
          if (response.ok) {
            addToCart(productId, 1);
            setShowPopup(true)
            setPopupMessage('Item added to the cart!')
            window.location.href='/wishlist'
         } else {
            setShowPopup(true);
            setPopupMessage('Item added to the cart!');
            console.error('Failed to add item to wish list');
          }
    }

    const closePopup = () => {
    setShowPopup(false);
    setPopupMessage('');
    };

    const renderWishListItems = () => {
        return userList.map(list => (
            list.list_product.map(lp => {
                const formattedPrice = currencyFormatter.format(lp.product.price);
                return (
                    <Col key={lp.product.id} xs={12} sm={6} md={4}>
                        <div className="wish-list-item">
                            <div className="product-image">
                                <Link to={`/products/${lp.product.id}`} style={{ textDecoration: 'none' }}><Image src={lp.product.image} alt={lp.product.name} fluid /></Link>
                            </div>
                            <div className="product-details">
                                <Link to={`/products/${lp.product.id}`} style={{ textDecoration: 'none', color: 'black' }}><strong>{lp.product.name}</strong></Link>
                                <p>{formattedPrice}</p>
                                <Button variant="dark" onClick={() => handleAddToCart(lp.product.id, lp.id)}>Add to Cart</Button> &nbsp;
                                <Button variant="danger" onClick={() => handleRemoveFromList(lp.id)}>Remove from Wish List</Button>
                            </div>
                        </div>
                    </Col>
                );
            })
        ));
    };

    return (
        <>
        <div className="font">
            <h1>{user.first_name}'s Wish List</h1>
            {userList.length > 0 ? (
                <Row>
                    {renderWishListItems()}
                </Row>
            ) : (
                <p>No items in the wish list!</p>
            )}
            <br />
            <Link to={'/products'} ><Button variant="dark">Back to Products</Button></Link>
        </div>
        {showPopup && <Popup message={popupMessage} onClose={closePopup} />}   
        </>
    );

}