import { useNavigate, Link, useLocation } from "react-router-dom";
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
    const location = useLocation();
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState("");
    const { user, loading } = useSelector(state => state.user);
    const [isCartPopupVisible, setCartPopupVisible] = useState(false);
    const [isCategoryDropdownVisible, setCategoryDropdownVisible] = useState(false);

    const categories = [
        "Automotive",
        "Books & Media",
        "Electronics",
        "Fashion",
        "Grocery",
        "Health, Beauty, & Personal Care",
        "Home & Kitchen",
        "Musical Instruments",
        "Pet Supplies",
        "Sports & Fitness",
        "Toys & Games",
        "Video Games",
    ];

    const toggleCartPopup = () => {
        setCartPopupVisible(!isCartPopupVisible);
    };

    const handleProfileClick = () => {
        if (user) {
            navigate("/profile");
        } else {
            navigate("/sign-in");
        }
    };

    const handleHomeClick = () => {
        navigate("/");
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === "Enter" && searchQuery.trim()) {
            event.preventDefault();
            navigate(`/search?keyword=${searchQuery}`, { replace: true });
        }
    };

    const handleOrderClick = () => {
        if (user) {
            navigate("/orders");
        } else {
            navigate("/sign-in");
        }
    };

    const toggleCategoryDropdown = () => {
        setCategoryDropdownVisible(!isCategoryDropdownVisible);
    };

    useEffect(() => {
        setCategoryDropdownVisible(false);
    }, [location]);

    return (
        <div className="fullNavbar">
            <div className="Navbar">
                <img src={Logo} alt="Logo" className="logo" onClick={handleHomeClick} />
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
                    <div className="navButton" id="order" onClick={handleOrderClick}>
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
                <div className="category" onClick={toggleCategoryDropdown}>
                    <img src={categoryMenu} alt="category" className="icons" id="categoryMenu" />
                    <p>Categories</p>
                    <img src={categoryArrow} alt="category" className="icons" id="categoryArrow" />
                </div>
                {isCategoryDropdownVisible && (
                    <div className="categoryDropdown">
                        {categories.map((category) => (
                            <Link key={category} to={`/search?category=${category}`} className="categoryItem">
                                {category}
                            </Link>
                        ))}
                    </div>
                )}
                <p>Best Sellers</p>
                <p>Deals</p>
                <Link to="/sell"><p>Sell</p></Link>
                <p>Customer Service</p>
                <p>About Us</p>
            </div>
        </div>
    );
}

export default Navbar;
