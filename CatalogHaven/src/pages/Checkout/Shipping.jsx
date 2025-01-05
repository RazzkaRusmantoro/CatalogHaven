import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import MapComponent from "./MapComponent"; 
import "./Shipping.css";

const Shipping = () => {
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo?.address || "");
    const [city, setCity] = useState(shippingInfo?.city || "");
    const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || "");
    const [postalCode, setPostalCode] = useState(shippingInfo?.postalCode || "");
    const [country, setCountry] = useState(shippingInfo?.country || "");
    const [isMapOpen, setIsMapOpen] = useState(false);

    const dispatch = useDispatch();

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
        "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", 
        "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
        "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", 
        "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", 
        "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", 
        "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Denmark", "Djibouti", "Dominica", 
        "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", 
        "Estonia", "Eswatini (fmr. 'Swaziland')", "Ethiopia", "Fiji", "Finland", "France", "Gabon", 
        "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", 
        "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", 
        "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", 
        "Kazakhstan", "Kenya", "Kiribati", "Korea (North)", "Korea (South)", "Kuwait", "Kyrgyzstan", 
        "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
        "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", 
        "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", 
        "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", 
        "Nicaragua", "Niger", "Nigeria", "North Macedonia (formerly Macedonia)", "Norway", "Oman", "Pakistan", 
        "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", 
        "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
        "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", 
        "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
        "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
        "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", 
        "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", 
        "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", 
        "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }));
    };

    const handleSelectAddress = (selectedAddress) => {
        setAddress(selectedAddress); // Update the address from MapComponent
        setIsMapOpen(false); // Close the map
    };

    return (
        <div>
            <div className="background-layer"></div>
            <div className="shipping">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>
                    <form className="shippingForm" onSubmit={submitHandler}>
                        <div>
                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNo">Phone Number:</label>
                            <input
                                type="tel"
                                id="phoneNo"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                pattern="^[+0-9]{1,4}[\. \-]?[0-9]+([\. \-]?[0-9]+)*$"
                                title="Please enter a valid phone number (numbers only, with optional symbols)"
                                required
                                maxLength="15"
                                onInput={(e) => {
                                    const value = e.target.value;
                                    // Allow only numbers, '+' , '-', '.', and space
                                    if (/[^0-9+\-.\s]/.test(value)) {
                                        e.target.value = value.replace(/[^0-9+\-.\s]/g, ''); // Remove invalid characters
                                    }
                                    if (value.length > 15) {
                                        e.target.value = value.slice(0, 15);
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="postalCode">Postal Code:</label>
                            <input
                                type="text"
                                id="postalCode"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="country">Country:</label>
                            <select
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                <option value="">Select a Country</option>
                                {countries.map((countryName) => (
                                    <option key={countryName} value={countryName}>
                                        {countryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="city">City:</label>
                            <input
                                type="text"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="shippingButton">
                            Save Shipping Info
                        </button>
                    </form>
                    <button className="mapButton" onClick={() => setIsMapOpen(true)}>
                        Select on Map
                    </button>
                </div>
                <div className="paymentButtonContainer">
                    <button className="paymentButton">Continue to Payment</button>
                    <div className="securityInfo">
                        <ul>
                            <li className="securityItem">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 80 80">
                                    <path fill="#bae0bd" d="M40,77.5C19.3,77.5,2.5,60.7,2.5,40S19.3,2.5,40,2.5S77.5,19.3,40,77.5z"></path>
                                    <path fill="#5e9c76" d="M40,3c20.4,0,37,16.6,37,37S60.4,77,40,77S3,60.4,3,40S19.6,3,40,3 M40,2C19,2,2,19,2,40s17,38,38,38 s38-17,38-38S61,2,40,2L40,2z"></path>
                                    <path fill="#fff" d="M34 56L20.2 42.2 24.5 38 34 47.6 58.2 23.4 62.5 27.6z"></path>
                                </svg>
                                <b>CatalogHaven ensures the security of your card information.</b>
                            </li>
                            <li>CatalogHaven adheres to the Payment Card Industry Data Security Standard (PCI DSS) for processing card data.</li>
                            <li>Your card details are safe and fully protected.</li>
                            <li>All data is encrypted for enhanced security.</li>
                            <li>CatalogHaven never sells your card information.</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Map Popup */}
            {isMapOpen && (
                <div className="mapPopup">
                    <div className="mapPopupContent">
                        <MapComponent onSelectAddress={handleSelectAddress}/>
                        <button className="closeMapButton" onClick={() => setIsMapOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                            <path d="M 39.486328 6.9785156 A 1.50015 1.50015 0 0 0 38.439453 7.4394531 L 24 21.878906 L 9.5605469 7.4394531 A 1.50015 1.50015 0 0 0 8.484375 6.984375 A 1.50015 1.50015 0 0 0 7.4394531 9.5605469 L 21.878906 24 L 7.4394531 38.439453 A 1.50015 1.50015 0 1 0 9.5605469 40.560547 L 24 26.121094 L 38.439453 40.560547 A 1.50015 1.50015 0 1 0 40.560547 38.439453 L 26.121094 24 L 40.560547 9.5605469 A 1.50015 1.50015 0 0 0 39.486328 6.9785156 z"></path>
                        </svg>
                    </button>
                    </div>
                    
                </div>
            )}

        </div>
    );
}

export default Shipping;
