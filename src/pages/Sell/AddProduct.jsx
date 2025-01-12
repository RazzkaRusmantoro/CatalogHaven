import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, clearErrors } from "../../actions/productActions";
import { toast } from "react-hot-toast";
import "./AddProduct.css";

const AddProduct = ({ closePopup }) => {
    const dispatch = useDispatch();
    
    const [isAdding, setIsAdding] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        stock: "",
        description: "",
        images: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        setNewProduct({ ...newProduct, images: files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setIsAdding(true);

        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("price", newProduct.price);
        formData.append("stock", newProduct.stock);
        formData.append("description", newProduct.description);
        formData.append("category", newProduct.category);

        Array.from(newProduct.images).forEach((file) => {
            formData.append("image", file);
        });

        try {
            await dispatch(addProduct(formData));
            
            setIsAdding(false);
            closePopup();
        } catch (error) {
            setIsAdding(false);
            toast.error("Failed to add product");
            dispatch(clearErrors());
        }
    };

    const handleClose = () => {
        closePopup();
        dispatch(clearErrors());
    };

    return (
        <div className="add-product-popup">
            <div className="popup-overlay" onClick={handleClose}></div>
            <div className="popup-content">
                <h2 className="add-product-header">Add New Product</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <div className="add-product-label">Product Name:</div>
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        <div className="add-product-label">Price:</div>
                        <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        <div className="add-product-label">Stock:</div>
                        <input
                            type="number"
                            name="stock"
                            value={newProduct.stock}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        <div className="add-product-label">Description:</div>
                        <textarea
                            name="description"
                            value={newProduct.description}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        <div className="add-product-label">Category:</div>
                        <select
                            name="category"
                            value={newProduct.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Automotive">Automotive</option>
                            <option value="Books & Media">Books & Media</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Health, Beauty, & Personal Care">Health, Beauty, & Personal Care</option>
                            <option value="Home & Kitchen">Home & Kitchen</option>
                            <option value="Musical Instruments">Musical Instruments</option>
                            <option value="Pet Supplies">Pet Supplies</option>
                            <option value="Sports & Fitness">Sports & Fitness</option>
                            <option value="Toys & Games">Toys & Games</option>
                            <option value="Video Games">Video Games</option>
                        </select>
                    </label>

                    <label>
                        <div className="add-product-label">Product Images:</div>
                        <input
                            type="file"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            required
                        />
                    </label>
                    <button type="submit" className="submit-btn" disabled={isAdding}>
                        {isAdding ? "Adding Product..." : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
