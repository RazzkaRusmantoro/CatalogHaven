import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartDropdown.css";


const CartDropdown = ({ cartItems }) => {

    const navigate = useNavigate();

    const handleCheckoutShipping = () => {
        navigate("/checkout/shipping");
    };
    
    return (
        <div className="cart-dropdown">
            <h4>Added to Cart!</h4>
            <ul className="cart-items">
                {cartItems.map((item, index) => (
                    <li key={index} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <span className="cart-item-name">{item.name}</span>
                            <span className="cart-item-quantity">QTY: {item.quantity}</span>
                            <span className="cart-item-price">${item.price}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="cart-dropdown-buttons">
                <button className="checkout-button" onClick = {handleCheckoutShipping}>Checkout</button>
            </div>
        </div>
    );
};

export default CartDropdown;
