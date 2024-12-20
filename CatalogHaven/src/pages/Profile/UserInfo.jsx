import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-hot-toast';
import "./UserInfo.css";
import Loader from '../../components/Loader';
import { FaPen } from 'react-icons/fa';

function UserInfo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Retrieve user data from Redux store
    const { user } = useSelector((state) => state.user);

    // Initialize local state with user data or empty object
    const [editableField, setEditableField] = useState("");
    const [userData, setUserData] = useState(user || {});

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        if (user) {
            setUserData(user); // Update local state when user data is available
        }
    }, [user]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const handleEdit = (field) => {
        setEditableField(field);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    useEffect(() => {
        // Clear the current password if autofilled
        if (currentPassword && currentPassword.length > 0) {
            setCurrentPassword('');
        }
    }, [currentPassword]);

    const handlePasswordChange = async () => {

        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("Please fill in all fields.");
            return;
        }
    
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirmation password do not match.");
            return;
        }
    
        try {

            const response = await axios.put('/password/update', {
                oldPassword: currentPassword,
                password: newPassword,
                confirmPassword: confirmPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
    
            if (response.data.success) {
                console.log("Password updated successfully:", response.data);
                toast.success("Password changed successfully!");
                setEditableField("");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                toast.error(response.data.error || "Error updating password!");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            toast.error("An error occurred while updating the password.");
        }
    };
    

    const handleSave = async () => {
        setEditableField(""); // Save and stop editing
        try {
            // Send the updated user data to the server for persistence
            const response = await axios.put('/profile/update', userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Use token for authentication
                }
            });
            // Handle the response (e.g., show success message)
            console.log("Profile updated successfully:", response.data);
            toast.success("Edit complete!"); // Show success toast
        } catch (error) {
            console.error("Error updating profile:", error);
            // Handle error (e.g., show an error message)
            toast.error("Error updating profile!"); // Show error toast
        }
    };

    // Check if user data is available and render appropriately
    if (!user) {
        return <Loader />;
    }

    return (
        <>
            <div className="background-layer"></div>
            <div className="user-info-container">
                <div className="user-image">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                    />
                </div>
                <div className="user-details">
                    <h2 className="user-name">
                        Welcome, {user.fname} {user.lname}!
                    </h2>
                </div>
                <div className="logout-button-container">
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
            <div className="user-profile-container">
                <div className="user-profile-details">
                    <h3>User Profile</h3>

                    {/* First Name */}
                    <div className="profile-item">
                        <strong>First Name:</strong>
                        {editableField === "firstName" ? (
                            <input
                                type="text"
                                name="fname"
                                value={userData.fname}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{userData.fname}</span>
                        )}
                        <FaPen
                            onClick={() => handleEdit("firstName")}
                            className="edit-icon"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="profile-item">
                        <strong>Last Name:</strong>
                        {editableField === "lastName" ? (
                            <input
                                type="text"
                                name="lname"
                                value={userData.lname}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{userData.lname}</span>
                        )}
                        <FaPen
                            onClick={() => handleEdit("lastName")}
                            className="edit-icon"
                        />
                    </div>

                    {/* Username */}
                    <div className="profile-item">
                        <strong>Username:</strong>
                        {editableField === "username" ? (
                            <input
                                type="text"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{userData.username}</span>
                        )}
                        <FaPen
                            onClick={() => handleEdit("username")}
                            className="edit-icon"
                        />
                    </div>

                    {/* Email */}
                    <div className="profile-item">
                        <strong>Email:</strong>
                        {editableField === "email" ? (
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{userData.email}</span>
                        )}
                        <FaPen
                            onClick={() => handleEdit("email")}
                            className="edit-icon"
                        />
                    </div>

                    {/* Password Change Section */}
                    <div className="profile-item">
                        <strong>Change Password:</strong>
                        {editableField === "password" ? (
                            <>
                                <div>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        placeholder="Current Password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        autoComplete="off"
                                        
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <button onClick={handlePasswordChange} className="save-button">
                                    Save New Password
                                </button>
                            </>
                        ) : (
                            <span>********</span>
                        )}
                        <FaPen
                            onClick={() => handleEdit("password")}
                            className="edit-icon"
                        />
                    </div>

                    {/* Join Date */}
                    <div className="profile-item">
                        <strong>Join Date:</strong>
                        <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>

                    {/* Save Button */}
                    {editableField && (
                        <div className="save-button-container">
                            <button className="save-button" onClick={handleSave}>
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserInfo;
