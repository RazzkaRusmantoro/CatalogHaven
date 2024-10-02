import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./home.css";
import sunglasses from "../../assets/sunglasses.png";
import bg from "../../assets/bg.png";
import bag from "../../assets/bag.png";
import pattern from "../../assets/pattern.png";

function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);

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

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await axios.get('/products/featured');

                if (response.data.success) {
                    if (response.data.products.length === 0) {
                        console.log('No featured products found.'); // Log when no products are found
                    } else {
                        setFeaturedProducts(response.data.products); // Set the fetched products to state
                        console.log('Fetched products:', response.data.products); // Log fetched products
                    }
                } else {
                    console.error('Failed to fetch products:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching featured products:', error.response.data);
            }
        };

        fetchFeaturedProducts(); // Call the function to fetch products
    }, []); // Empty dependency array ensures this runs once on component mount

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
                            {featuredProducts.length > 0 ? (
                                featuredProducts.map(product => (
                                    <div key={product._id} className="product-item">
                                        <img src={product.images[0].url} alt={product.name} />
                                        <h6>{product.name}</h6>
                                        <p id = "price">USD ${product.price}</p>
                                    </div>
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
