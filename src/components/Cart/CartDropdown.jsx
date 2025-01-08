import React from "react";
import "./CartDropdown.css";

const CartDropdown = ({ cartItems }) => {
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
                <button className="view-cart-button">View Cart</button>
                <button className="checkout-button">Checkout</button>
            </div>
        </div>
    );
};

export default CartDropdown;
