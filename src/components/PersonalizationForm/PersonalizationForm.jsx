import { useState } from 'react';
import { Button } from 'react-bootstrap'
import Popup from "../Popup/Popup"
import axios from 'axios';

export default function PersonalizationForm({ userCart }) {
  const [personalization, setPersonalization] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming userCart has only one cart, you might need to adjust this logic
      const cartId = userCart.length > 0 ? userCart[0].id : null;
      if (!cartId) {
        console.error('User cart not found');
        return;
      }
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/newcartrequest/`, {
        cart_id: cartId,
        personalization: personalization
      });
      console.log(response.data);
      setPersonalization('');
      setShowPopup(true)
      setPopupMessage('Personalisations and Requests recorded!')
      // Optionally, you can handle success response here
    } catch (error) {
      console.error('Error:', error);
      // Optionally, you can handle error response here
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <strong>Personalisation or Special Requests:</strong>
          <p>We are able to personalise all of our products. Please leave any details below and on which items. The more and clearer detail the better!</p> 
          <textarea
            value={personalization}
            onChange={(e) => setPersonalization(e.target.value)}
            rows={4}
            cols={50}
            required
          />
        </label>
        <br />
        <Button type="submit" variant='dark'>Add Requests and Personalisations to Cart</Button>
      </form>
      {showPopup && <Popup message={popupMessage} onClose={closePopup} />} 
    </>
  );
};
