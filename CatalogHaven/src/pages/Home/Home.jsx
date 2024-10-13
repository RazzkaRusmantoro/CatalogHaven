import React, { useEffect } from 'react';
import "./home.css";

import sunglasses from "/assets/sunglasses.png";
import bg from "/assets/bg.png";
import bag from "/assets/bag.png";
import pattern from "/assets/pattern.png";

import ProductItem from '../../components/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { getFeaturedProducts } from '../../actions/productActions';
import Loader from '../../components/Loader';


function Home() {

    // const alert = useAlert();
    const dispatch = useDispatch();

    // Get featured products and loading state from Redux
    const { loading, featuredProducts, error } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getFeaturedProducts()); // Dispatch the action to fetch featured products

        if (error) {
            alert.error(error);
        }
    }, [dispatch]);

    // Intersection observer for animation
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target); 
                }
            });
        });

        const featuredElement = document.querySelector('#featured');
        if (featuredElement) { 
            observer.observe(featuredElement);
        }

        return () => {
            if (featuredElement) {
                observer.unobserve(featuredElement);
            }
        };
    }, []);

    

    

    return (
        <>
            <div className="content-wrapper">
                <div className="container-display-box">
                    <p> WE HAVE <br /> <b>YOUR WANTS.</b></p>
                    <img src={sunglasses} alt="sunglasses" />
                    <img src={bg} id="bg" alt="background" />
                    <img src={bag} id="bag" alt="bag" />
                    <img src={pattern} id="pattern" alt="pattern" />
                    <img src={pattern} id="pattern2" alt="pattern" />
                    <img src={pattern} id="pattern3" alt="pattern" />
                    <img src={pattern} id="pattern4" alt="pattern" />
                    <img src={pattern} id="pattern5" alt="pattern" />
                    <img src={pattern} id="pattern6" alt="pattern" />

                    <h6 className="subtext">With sales starting at 20% off...</h6>
                    <button className="button">SHOP NOW</button>
                </div>

                <div className="container-under-box"></div>

                <div className="products-box-2">
                    <div className="featured-container">
                        <div>
                            <p id="featured"><b>Featured Products</b></p>
                            <hr id="hr" />
                        </div>
                        <div className="products">
                            {loading ? (
                                <Loader/>
                            ) : error ? (
                                <p>{error}</p>
                            ) : featuredProducts.length > 0 ? ( // Check featuredProducts instead of products
                                featuredProducts.map(product => (
                                    <ProductItem key={product._id} product={product} /> // Use the ProductItem component
                                ))
                            ) : (
                                <p>No featured products available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
