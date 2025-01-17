import React from "react";
import "./ContactPopup.css";

const ContactPopup = ({ isVisible, onClose }) => {
    return (
        <>
            <div className="popup-overlay">
                <div className="popup-container">
                    <button className="popup-close-btn" onClick={onClose}>
                    ×
                    </button>
                    <h2 className="popup-title">Contact Customer Service</h2>
                    <p className="popup-message">
                    We’re here to help! Please fill out the form below or email us at
                    <a href="mailto:support@example.com"> cataloghaven.contact@gmail.com</a>.
                    </p>
                    <form className="popup-form">
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea placeholder="Your Message" rows="4" required></textarea>
                    <button type="submit" className="popup-submit-btn">
                        Contact
                    </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactPopup;