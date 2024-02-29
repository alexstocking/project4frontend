import { useEffect } from "react"
import { useProducts } from "../../contexts/ProductContext"
import { currencyFormatter } from '../../utilities/currencyFormatter'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function WishListPage({ user }) {
    const { lists, getWishListProducts, removeFromList} = useProducts()
    

    useEffect(() => {
      getWishListProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRemoveFromList = (listProductId) => {
        removeFromList(listProductId);
        window.location.href='/wishlist'
    };
  
    const userList = lists.filter(list => list.user === user.id);
    console.log(userList)
    
    let totalPrice = 0


    return (
        <>
            <h1>{user.first_name}'s Wish List</h1>
            {userList.length > 0 ? (
                <>
                    <ul>
                        {userList.map(list => (
                            list.list_product.sort((a, b) => a.product.name.localeCompare(b.product.name))
                            .map(lp => {
                                const formattedPrice = currencyFormatter.format(lp.product.price);
                                totalPrice += lp.product.price;
                                return (
                                    <li key={lp.product.id}>
                                        <strong>{lp.product.name}</strong>
                                        <p>{formattedPrice}</p>
                                        <Button variant="danger" onClick={() => handleRemoveFromList(lp.id)}>Remove</Button>
                                    </li>
                                );
                            })
                        ))}
                    </ul>
                    <p>Total Price: {currencyFormatter.format(totalPrice)}</p>
                </>
            ) : (
                <p>No items in the wish list!</p>
            )}
            <Link to={'/products'} ><Button variant="secondary" >Back to Products</Button></Link>
        </>
    );
}
