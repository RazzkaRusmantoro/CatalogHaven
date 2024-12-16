import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductItem from "../../components/ProductItem";
import ReactPaginate from "react-paginate";
import Loader from '../../components/Loader';
import 'rc-slider/assets/index.css';
import "./Search.css";


function Search() {
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [price, setPrice] = useState([1, 10000])
    const [pageCount, setPageCount] = useState(0);
    const resPerPage = 8; // Results per page

    // Extract query parameters from the URL
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("keyword") || "";
    const selectedCategory = searchParams.get("category") || "";
    const currentPage = parseInt(searchParams.get("page")) || 1;

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

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = `/search?keyword=${searchQuery}&page=${currentPage}&limit=${resPerPage}`;
                if (selectedCategory) {
                    url += `&category=${selectedCategory}`;
                }

                const response = await axios.get(url);
                setProducts(response.data.products);
                setPageCount(Math.ceil(response.data.productCount / resPerPage));
            } catch (err) {
                setError("Error fetching products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchQuery, selectedCategory, currentPage]);

    const handleCategoryChange = (category) => {
        const params = new URLSearchParams(location.search);

        // Toggle category in URL
        if (selectedCategory === category) {
            params.delete("category"); // Remove category
        } else {
            params.set("category", category); // Set new category
        }

        params.set("page", 1); // Reset to the first page
        navigate(`?${params.toString()}`); // Update the URL
    };

    const handlePageClick = (event) => {
        const params = new URLSearchParams(location.search);
        params.set("page", event.selected + 1); // Update page parameter
        navigate(`?${params.toString()}`); // Update the URL
    };

    return (
        <div className="searchPage">
            <div className="sidebar">
                <div className="container-sidebar">
                    <div className="categoriess">
                        <h3>Categories:</h3>
                        <ul>
                            {categories.map((category) => (
                                <li
                                    key={category}
                                    className={selectedCategory === category ? "selected" : ""}
                                    onClick={() => handleCategoryChange(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mainContent">
                <div className="productsList">
                    {error ? (
                        <p>{error}</p>
                    ) : loading ? (
                        
                        <Loader/>
                    ) : (
                        <div className="productsGrid">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductItem key={product._id} product={product} />
                                ))
                            ) : (
                                <p>No products found.</p>
                            )}
                        </div>
                    )}
                </div>
                <div className="paginationContainer">
                    <ReactPaginate
                        previousLabel={"← Previous"}
                        nextLabel={"Next →"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />
                </div>
            </div>
        </div>
    );
}

export default Search;
