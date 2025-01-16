import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart } from "../../actions/cartActions";
import "./Checkout.css";

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};
    const cartItems = useSelector((state) => state.cart.cartItems);

    const handleChangeAddress = () => {
        navigate("/checkout/shipping");
    };

    const handleDeleteItem = (id) => {
        dispatch(removeItemFromCart(id));
    };

    const handleSubmitOrder = () => {
        navigate("/checkout/payment");
    };

    // Calculate the subtotal, shipping, and order total
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0; // Free shipping for now
    const orderTotal = subtotal + shipping;
    const totalItems = cartItems.length;
    const totalItemsCost = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            <div className="background-layer"></div>
            <div className="checkout">
                {/* Saved Shipping Address Container */}
                <div className = "checkout-left-container">
                    <div className="shippingInfoContainer">
                        <div className="titleWithButton">
                            <h3 style={{ color: "red" }}>Shipping Address</h3>
                            <button className="changeAddressButton" onClick={handleChangeAddress}>
                                <svg
                                    className="changeAddressIcon"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="100"
                                    height="100"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M11.5 20A.5.5 0 1011.5 21 .5.5 0 1011.5 20zM14.5 20A.5.5 0 1014.5 21 .5.5 0 1014.5 20zM17.5 20A.5.5 0 1017.5 21 .5.5 0 1017.5 20zM12.586 4.838L4.256 16.998c-.052.075-.082.164-.087.256L4 20.474c-.009.176.075.343.22.441C4.305 20.972 4.402 21 4.5 21c.072 0 .145-.016.212-.047l2.92-1.366c.081-.038.15-.097.201-.171L16.168 7.25 12.586 4.838zM16.733 6.424l1.222-1.784c.086-.125.11-.283.065-.429-.013-.041-.32-1.017-1.266-1.654-.945-.636-1.963-.553-2.008-.551-.149.013-.284.092-.369.216l-1.227 1.79L16.733 6.424z"></path>
                                </svg>
                            </button>
                        </div>
                        {shippingInfo.address ? (
                            <div className="shippingDetails">
                                <p style={{ color: "#616161" }}>
                                    <strong style={{ color: "#5a0000" }}>Address:</strong>{" "}
                                    {shippingInfo.address}
                                </p>
                                <p style={{ color: "#616161" }}>
                                    <strong style={{ color: "#5a0000" }}>City:</strong>{" "}
                                    {shippingInfo.city}
                                </p>
                                <p style={{ color: "#616161" }}>
                                    <strong style={{ color: "#5a0000" }}>Postal Code:</strong>{" "}
                                    {shippingInfo.postalCode}
                                </p>
                                <p style={{ color: "#616161" }}>
                                    <strong style={{ color: "#5a0000" }}>Country:</strong>{" "}
                                    {shippingInfo.country}
                                </p>
                                <p style={{ color: "#616161" }}>
                                    <strong style={{ color: "#5a0000" }}>Phone:</strong>{" "}
                                    {shippingInfo.phoneNo}
                                </p>
                            </div>
                        ) : (
                            <p>No shipping address found. Please add an address.</p>
                        )}
                    </div>

                    {/* Cart Items Container */}
                    <div className="cartItemsContainer">
                        <h3 style={{ color: "red" }}>Cart Items</h3>
                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <div key={item.id}>
                                    <div className="cartItem">
                                        <img
                                            src={item.image || "placeholder.jpg"}
                                            alt={item.name}
                                            className="cartItemImage"
                                        />
                                        <div className="cartItemDetails">
                                            <p style={{ color: "#616161" }}>
                                                <strong style={{ color: "red" }}>Name:</strong> {item.name}
                                            </p>
                                            <p style={{ color: "#616161" }}>
                                                <strong style={{ color: "red" }}>Quantity:</strong> {item.quantity}
                                            </p>
                                            <p style={{ color: "#616161" }}>
                                                <strong style={{ color: "red" }}>Price:</strong> ${item.price}
                                            </p>
                                        </div>
                                        <button
                                            className="remove-item-button"
                                            onClick={() => handleDeleteItem(item.id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                                                <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    {index < cartItems.length - 1 && <hr className="cartItemSeparator" />}
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>
                </div>

                {/* Order Summary Container */}
                <div className="orderSummaryContainer">
                    <h3 style={{ color: "red" }}>Order Summary</h3>
                    <hr className="cartItemSeparator" />
                    <div className="orderSummary">
                        <p>
                            <strong>Apply Coupon Code:</strong>
                            <input
                                type="text"
                                className = "couponCodeInput"
                            />
                        </p>
                        <hr className="cartItemSeparator" />
                        <p className = "textOrder">
                            <strong className = "headOrder">Total Items:</strong> <p className = "value" style={{ color: "#ff9900" }}>{totalItems} Items</p>
                        </p>
                        <p className = "textOrder">
                            <strong className = "headOrder">Total Items Cost:</strong> <p className = "value" style={{ color: "#ff9900" }}>${totalItemsCost}</p>
                        </p>
                        <p className = "textOrder">
                            <strong className = "headOrder">Subtotal:</strong> <p className = "value" style={{ color: "#ff9900" }}>${subtotal.toFixed(2)}</p>
                        </p>
                        <hr className="cartItemSeparator" />
                        <p className = "textOrder">
                            <strong className = "headOrder">Shipping:</strong> <p className = "value" style={{ color: "#ff9900" }}>Free</p>
                        </p>
                        <hr className="cartItemSeparator" />
                        <p className = "textOrder">
                            <strong className = "headOrder">Order Total:</strong> <p className = "value" style={{ color: "#ff9900" }}>${orderTotal.toFixed(2)}</p>
                        </p>
                        <hr className="cartItemSeparator" />
                    </div>
                    <button className="submitOrderButton sheen" onClick = {handleSubmitOrder}><div className="sheenText">Submit Order</div></button>
                </div>
            </div>
        </>
    );
};

export default Checkout;
