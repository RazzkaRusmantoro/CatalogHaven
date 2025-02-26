import React from "react";
import box from "/assets/corrugated_boxes.png";
import { Link }from "react-router-dom";

import "./Sell.css";

const Sell = () => {
    return (
        <>
        <div>
            <div className = "sell-bg">
                <div className = "background-layer"></div>
                <div className = "background-wave">
                    <div className = "red-wave"></div>
                    <div class="custom-shape-divider-top-1736541964">
                            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                            </svg>
                        </div>
                </div>
            </div>
            
            <div className="sell-container">
                <div className = "sell-text-container">
                    <h1 className = "sell-text">Become a seller at CatalogHaven</h1>
                    <p className = "sell-description">Allow yourself to sell your own items at our platform!</p>
                    <div className = "sell-button-container">
                        <Link to = "/sell/dashboard">
                            <button>
                                Let's Sell!
                            </button>
                        </Link>
                    </div>
                </div>
                <div className = "sell-image-container">
                    <img src = {box} className = "sell-box" />
                </div>
            </div>
        </div>
        </>
    );
};

export default Sell;