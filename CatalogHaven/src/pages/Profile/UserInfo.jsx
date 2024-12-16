import React from "react";
import { useSelector } from "react-redux";
import "./UserInfo.css";

function UserInfo() {

    const { user } = useSelector((state) => state.user);

    return (
        <>
            {/* Background Layer */}
            <div className="background-layer"></div>

            {/* User Info Container */}
            <div className="user-info-container">

                <div className="user-image">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                    />
                </div>


                <div className="user-details">
                    <h2 className="user-name">{user ? `Welcome, ${user.fname} ${user.lname}!` : "Loading..."}</h2>
                </div>
            </div>
        </>
    );
}

export default UserInfo;
