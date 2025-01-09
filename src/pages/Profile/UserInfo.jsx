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

    const { user } = useSelector((state) => state.user);

    const [editableField, setEditableField] = useState("");
    const [userData, setUserData] = useState(user || {});
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState(user?.avatar?.url || "https://via.placeholder.com/150");

    useEffect(() => {
        if (user) {
            setUserData(user);
            setPreview(user.avatar?.url || "https://via.placeholder.com/150");
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

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Selected file:", file); // Check if file is selected
            setProfilePicture(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    

    const handleProfilePictureUpload = async () => {
        const formData = new FormData();
        formData.append("avatar", profilePicture);
    
        try {
            const response = await axios.put('/profile/update/avatar', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });
    
            if (response.data.success) {
                toast.success("Profile picture updated successfully!");
            } else {
                toast.error(response.data.error || "Error updating profile picture.");
            }
        } catch (error) {
            console.error("Error updating profile picture:", error);
            toast.error("An error occurred while updating the profile picture.");
        }
    };
    
    
    
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
                },
            });

            if (response.data.success) {
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
        setEditableField("");
        try {
            const response = await axios.put('/profile/update', userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            toast.success("Edit complete!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile!");
        }
    };

    if (!user) {
        return <Loader />;
    }

    return (
        <>
            <div className="background-layer"></div>
            <div className="user-info-container">
                <div className="user-image">
                    <label htmlFor="profile-picture-input">
                        <img src={preview} alt="Profile" className="profile-picture" />
                        <input
                            id="profile-picture-input"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleProfilePictureChange}
                        />
                    </label>
                    {profilePicture && (
                        <button onClick={handleProfilePictureUpload} className="save-button">
                            Upload Picture
                        </button>
                    )}
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

                    <div className="profile-item">
                        <strong>Join Date:</strong>
                        <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>

                    {editableField && editableField !== "profilePicture" && (
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
