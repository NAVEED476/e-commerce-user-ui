import React from "react";
import "./checkout.css";
import { useLocation } from "react-router-dom";

const Checkout = () => {
    const location = useLocation();
    const totalCost = location.state?.totalCost ?? 0;
  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <p>Total Cost: {totalCost.toFixed(2)}</p>
      <div className="checkout-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="techEagle" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="tech@gmail.com" />

        <label htmlFor="address">Address:</label>
        <textarea id="address" placeholder="Enter your address"></textarea>

        <label htmlFor="cardNumber">Card Number:</label>
        <input type="text" id="cardNumber" placeholder="**** **** **** ****" />

        <label htmlFor="expiryDate">Expiry Date:</label>
        <input type="text" id="expiryDate" placeholder="MM/YY" />

        <label htmlFor="cvv">CVV:</label>
        <input type="text" id="cvv" placeholder="123" />

        <button className="checkout-button">Complete Purchase</button>
      </div>
    </div>
  );
};

export default Checkout;
