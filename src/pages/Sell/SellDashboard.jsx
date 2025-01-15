import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, addProduct, getUserProducts, getProductRevenue, updateProduct } from "../../actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import { linkStripeAccount, checkStripeAccountLink } from "../../actions/stripeActions";
import AddProduct from "./AddProduct";
import { toast } from "react-hot-toast";
import axios from "axios";
import "./SellDashboard.css";

const SellDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error, isUpdated } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { totalRevenue, revenueLoading, revenueError } = useSelector((state) => state.products);
  const [productRevenues, setProductRevenues] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageStatus, setImageStatus] = useState("");
  const [isImageAccepted, setIsImageAccepted] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showLinkStripePopup, setShowLinkStripePopup] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getUserProducts(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      products.forEach((product) => {
        dispatch(getProductRevenue(product._id)).then((data) => {
          setProductRevenues((prevRevenues) => ({
            ...prevRevenues,
            [product._id]: data.totalRevenue,
          }));
        });
      });
    }
  }, [dispatch, products]);

  useEffect(() => {
    if (isUpdated) {
      console.log("Updated Product:", isUpdated);
      toast.success("Product updated!");
    }
  }, [isUpdated]);

  // Check if Stripe account is linked when user is available
  useEffect(() => {
    if (user && !user.stripeAccountId) {
      setShowLinkStripePopup(true);
    } else if (user && user.stripeAccountId) {
      // Check if the Stripe account is fully linked
      axios.get(`/stripe/link-status/${user._id}`).then((response) => {
        if (response.data.isLinked) {
          setShowLinkStripePopup(false);
        } else {
          setShowLinkStripePopup(true);
        }
      }).catch((err) => {
        console.error('Error checking Stripe account status:', err);
      });
    }
  }, [user]);

  const togglePopup = () => {
    if (!user.stripeAccountId) {
      setShowLinkStripePopup(true);
      return;
    }
    setShowPopup(!showPopup);
  };

  const handleEditClick = (product) => {
    setEditingProduct({ ...product, image: null });
    setImageStatus("");
  };

  const handleUpdateProduct = () => {
    setIsSaving(true);
    const updatedData = {
      name: editingProduct.name,
      stock: editingProduct.stock,
      price: editingProduct.price,
      image: editingProduct.image,
    };
    dispatch(updateProduct(editingProduct._id, updatedData));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isValidImage = file.type.startsWith("image/");
      if (isValidImage) {
        setIsImageAccepted(true);
        setEditingProduct({ ...editingProduct, image: file });
      } else {
        setIsImageAccepted(false);
      }
    }
  };

  const getImageSrc = (product) => {
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0].url;
    } else if (product.image) {
      return product.image.url;
    } else {
      return "/placeholder.png";
    }
  };

  const handleStripeOnboarding = async () => {
    try {
      const { data } = await axios.post("/stripe/onboarding", { userId: user._id });

      if (data.success) {
        // Redirect the user to Stripe for onboarding
        window.location.href = data.url;
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during Stripe onboarding:", error);
      alert("Failed to initiate Stripe onboarding");
    }
  };


  return (
    <>
      {showPopup && <AddProduct closePopup={togglePopup} />}
      <div className="background-layer"></div>

      {/* Conditionally render the Stripe container */}
      {!user?.stripeAccountId && (
        <div className="stripe-container">
          {showLinkStripePopup && (
            <div className="link-stripe-popup">
              <div className="popup-content">
                <h1>You need to link your Stripe account to sell a product!</h1>
                <p>
                  <span className="stripe-text">To start selling, please link your Stripe account.</span>
                  <br />
                  <button className="stripe-btn" onClick={handleStripeOnboarding}>
                    <i className="stripe-animation"></i>Click here to link your Stripe account<i className="stripe-animation"></i>
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="sell-dashboard">
        <div className="sell-container-header">
          <h1>↓ Your Products:</h1>
          <button className="sell-button" onClick={togglePopup}>
            <span>Sell a Product</span>
            <svg className="sell-icon" viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"></path>
            </svg>
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : products && products.length > 0 ? (
          <div className="product-list-sell">
            {products.map((product) => (
              <div key={product._id} className="product-card-sell">
                <div className="product-image-sell">
                  {editingProduct && editingProduct._id === product._id ? (
                    <div>
                      <input
                        type="file"
                        id="file-input"
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: "none" }}
                      />
                      <label
                        htmlFor="file-input"
                        className={`file-input-label ${
                          isImageAccepted === false
                            ? "error"
                            : isImageAccepted === true
                            ? "accepted"
                            : ""
                        }`}
                      >
                        {isImageAccepted === null
                          ? "Update Photo"
                          : isImageAccepted
                          ? "Accepted!"
                          : "Rejected!"}
                      </label>
                    </div>
                  ) : (
                    <img src={getImageSrc(product)} alt={product.name} />
                  )}
                </div>
                <div className="product-details-sell">
                  <div>
                    <h3>
                      {editingProduct && editingProduct._id === product._id ? (
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, name: e.target.value })
                          }
                          className="product-name-sell-input"
                          placeholder="Product Name"
                        />
                      ) : (
                        product.name
                      )}
                    </h3>
                    <p className="price-sell" style={{ color: "#fc9d03" }}>
                      Price:
                      {editingProduct && editingProduct._id === product._id ? (
                        <input
                          type="number"
                          value={editingProduct.price}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, price: e.target.value })
                          }
                          className="product-name-sell-input"
                          placeholder="Price"
                        />
                      ) : (
                        <span style={{ color: "#fc6f03" }}> ${product.price}</span>
                      )}
                    </p>
                    <p>
                      Stock:
                      {editingProduct && editingProduct._id === product._id ? (
                        <input
                          type="number"
                          value={editingProduct.stock}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, stock: e.target.value })
                          }
                          className="product-name-sell-input"
                          placeholder="Stock"
                        />
                      ) : (
                        <span style={{ color: "black" }}> {product.stock}</span>
                      )}
                    </p>
                    <p style={{ color: "#5789ff" }}>
                      Total Revenue:{" "}
                      <span style={{ color: "#26285e" }}>${productRevenues[product._id]}</span>
                    </p>
                  </div>
                  <div className="view-details-container">
                    <Link to={`/product/${product._id}`} className="view-details" role="button">
                      <span className="view-text">View Details</span>
                      <span className="view-text-2">Click Here!</span>
                    </Link>
                    <button onClick={() => handleEditClick(product)} className="edit-button">
                      <svg
                        className="edit-icon"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.866 1.293a2 2 0 0 0-2.828 0L9.121 3.122 12.879 6.88l2.121-2.121a2 2 0 0 0 0-2.828z"></path>
                        <path
                          fillRule="evenodd"
                          d="M3 13V3h10v10H3z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-sell-message">
            <p>No products available.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SellDashboard;
