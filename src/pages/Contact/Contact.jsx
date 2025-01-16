import React, { useState, useEffect } from "react";
import "./Contact.css";
import contactimg1 from "/assets/contactimg1.jpg";
import contactimg2 from "/assets/contactimg2.jpg";

const Contact = () => {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowImage((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="background-layer"></div>
      <div className="contact-container">
        <div className="contact-left">
          <div className="contact-text"></div>
        </div>
        <div className="contact-right">
          <div className="contact-images">
            <img
              src={contactimg1}
              className={`contactimg1 ${showImage ? "image-fade-active" : "image-fade"}`}
              alt="Contact 1"
            />
            <img
              src={contactimg2}
              className={`contactimg2 ${showImage ? "image-fade" : "image-fade-active"}`}
              alt="Contact 2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
