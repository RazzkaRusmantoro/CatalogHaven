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
    const dispatch = useDispatch();

    // Get featured products and loading state from Redux
    const { loading, featuredProducts, error } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getFeaturedProducts()); // Dispatch the action to fetch featured products
    }, [dispatch]);

    // Intersection observer for animation
    useEffect(() => {
        const productItems = document.querySelectorAll('.product-item');
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

            <div className="slider" style={{ '--width': '100px', '--height': '50px', '--quantity': '6', }}>
                <div className="list">
                    <div className="item" style={{ '--position': 1 }}><p>30% OFF!</p></div>
                    <div className="item" style={{ '--position': 2 }}><p>GET IT NOW!</p></div>
                    <div className="item" style={{ '--position': 3 }}><p>FREE SHIPPING!</p></div>
                    <div className="item" style={{ '--position': 4 }}><p>LIMITED TIME!</p></div>
                    <div className="item" style={{ '--position': 5 }}><p>SHOP THE SALE!</p></div>
                    <div className="item" style={{ '--position': 6 }}><p>NEW ARRIVALS!</p></div>
                    
                    
                </div>
            </div>
            <div className="content-wrapper">
                <div className="container-display-box">
                    <div className = "banner-text">
                        <p> WE HAVE <br /> <b>YOUR WANTS.</b></p>
                    </div>
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
                    <button className="button-56">SHOP NOW</button>
                </div>

                <div className="container-under-box"></div>

                

                <div className="products-box-2">
                    <div className="featured-container">
                        <div className="featured-box">
                            <p id="featured"><b>Featured Products</b></p>
                            <hr id="hr" />
                        </div>
                        <div className="products">
                            {loading ? (
                                <Loader />
                            ) : error ? (
                                <p>{error}</p>
                            ) : featuredProducts.length > 0 ? (
                                featuredProducts.map(product => (
                                    <ProductItem key={product._id} product={product} />
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
