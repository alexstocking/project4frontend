import React, { useEffect } from 'react';
import './Popup.css'

export default function Popup({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // Adjust the time the popup stays visible (in milliseconds)
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="popup-container">
      <div className="popup">
        <p>{message}</p>
      </div>
    </div>
  );
};

