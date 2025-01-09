import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; 
import "./navbar.css";
import Logo from "/assets/Logo.png";
import order from "/assets/order.png";
import cart from "/assets/cart.png";
import profile from "/assets/profile.png";
import categoryMenu from "/assets/3-Lines.png";
import categoryArrow from "/assets/arrow.png";
import CartPopup from "./Cart/CartPopup";

import { useDispatch, useSelector } from "react-redux";

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState("");

    const { user, loading } = useSelector(state => state.user);

    const [isCartPopupVisible, setCartPopupVisible] = useState(false);

    const toggleCartPopup = () => {
        setCartPopupVisible(!isCartPopupVisible);
    };

    const handleProfileClick = () => {
        if (user) {
            navigate("/profile"); // Navigate to the profile page if user is logged in
        } else {
            navigate("/sign-in"); // Navigate to the login page if not logged in
        }
        
    };

    const handleHomeClick = () => {
        navigate("/");
    };
        
    const handleLoginClick = () => {
        navigate("/sign-in");
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === "Enter" && searchQuery.trim()) {
            navigate(`/search?keyword=${searchQuery}`);
        }
    };

    const handleOrderClick = () => {
        if (user) {
            navigate("/orders");
        } else {
            navigate("/sign-in");
        }
    }

    useEffect(() => {
        if (searchQuery === "") {
            setSearchQuery("");
        }
    }, [searchQuery]);

    console.log(user);
    

    return (
        <div className="fullNavbar">
            <div className="Navbar">
                <img src={Logo} alt="Logo" className="logo" onClick={handleHomeClick}/>
                <form autoComplete="off" style={{ width: "50%" }}> 
                    <input 
                        type="text" 
                        placeholder="Search for a product..." 
                        className="searchBar" 
                        value={searchQuery} 
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchKeyDown}
                        autoComplete="none"  
                    />
                </form>
                <div className="iconSection">
                    <div className="navButton" id="cart" onClick={toggleCartPopup}>
                        <p>Cart</p>
                        <img src={cart} alt="Cart" className="icons" />
                    </div>
                    <div className="navButton" id="order"onClick={handleOrderClick}>
                        <p>Orders</p>
                        <img src={order} alt="order" className="icons" />
                    </div>
                    <div className="navButton" id="profile" onClick={handleProfileClick}>
                        <p>{user ? "Profile" : "Login"}</p>
                        <img src={profile} alt="Profile" className="icons" />
                    </div>
                </div>
            </div>
            {/* Cart Popup */}
            <CartPopup isVisible={isCartPopupVisible} onClose={() => setCartPopupVisible(false)} />
            <div className="Navbar2">
                <div className="category">
                    <img src={categoryMenu} alt="category" className="icons" id="categoryMenu" />
                    <p>Categories</p>
                    <img src={categoryArrow} alt="category" className="icons" id="categoryArrow" />
                </div>
                <p>Best Sellers</p>
                <p>Deals</p>
                <p>Sell</p>
                <p>Customer Service</p>
                <p>About Us</p>
            </div>
        </div>
    );
}

export default Navbar;