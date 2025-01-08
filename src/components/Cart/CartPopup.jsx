import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCartItemQuantity, removeItemFromCart } from "../../actions/cartActions";
import "./CartPopup.css";

const CartPopup = ({ isVisible, onClose }) => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    // Handle quantity change
    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return; // Prevent invalid quantity
        dispatch(updateCartItemQuantity(id, newQuantity));
    };

    // Handle item removal
    const handleRemoveItem = (id) => {
        dispatch(removeItemFromCart(id));
    };

    return (
        <>
            {/* Gray overlay */}
            <div
                className={`overlay ${isVisible ? "visible" : ""}`}
                onClick={onClose}
            ></div>
    
            {/* Cart Popup */}
            <div className={`cart-popup ${isVisible ? "visible" : ""}`}>
                <div className="cart-header">
                    <h2>CURRENT CART</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="cart-content">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4>{item.name}</h4>
                                    <p>Price: USD ${item.price}</p>
                                    <div className="quantity-control">
                                        <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                                        <input
                                            type="number"
                                            id={`quantity-${item.id}`}
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) =>
                                                handleQuantityChange(item.id, parseInt(e.target.value))
                                            }
                                        />
                                        <button
                                            className="remove-item-button"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                                                <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
                {/* Cart Footer */}
                {cartItems.length > 0 && (
                    <div className="cart-footer">

                        <button className="checkout-button">Checkout</button>
                    </div>
                )}
            </div>
        </>
    );
};    

export default CartPopup;
