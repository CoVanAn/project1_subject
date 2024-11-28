import { useContext, useState } from "react";
import axios from "axios";
import "./Profile.scss";
import { StoreContext } from "../../../context/StoreContext";

const Profile = () => {
    const { user, setUser, fetchUser, token } = useContext(StoreContext);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");

    // Hàm cập nhật số điện thoại
    const handlePhoneChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8080/api/users/${user.userId}`,
                { "phoneNumber" : phoneNumber },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // Cập nhật thông tin người dùng sau khi thay đổi thành công
            setUser({ ...user, phoneNumber: response.data.phoneNumber });
            setIsEditingPhone(false);  // Tắt chế độ chỉnh sửa
        } catch (error) {
            console.error("Error updating phone number:", error);
        }
    };

    // Nếu chưa có userId trong localStorage, hiển thị thông báo
    if (!localStorage.getItem("userId")) return (
        <div className="profile-container">
            <h1>User</h1>
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-left">
                        <div className="profile-picture">
                            <span className="profile-icon"></span>
                        </div>
                        <div className="profile-details">
                            <h2></h2>
                        </div>
                    </div>
                    <button className="edit-btn">Edit Profile</button>
                </div>
                <div className="profile-info">
                    <div className="profile-row">
                        <label>Email</label>
                        <div></div>
                    </div>
                    <div className="profile-row">
                        <label>Mobile number</label>
                        <div>Not available</div>
                    </div>
                    <div className="profile-row">
                        <label>First Name</label>
                        <span></span>
                    </div>
                    <div className="profile-row">
                        <label>Last Name</label>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="profile-container">
            <h1>{user.username || "User"}</h1>
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-left">
                        <div className="profile-picture">
                            <span className="profile-icon">{user.username?.charAt(0)}</span>
                        </div>
                        <div className="profile-details">
                            <h2>{user.firstName} {user.lastName}</h2>
                        </div>
                    </div>
                    <button className="edit-btn">Edit Profile</button>
                </div>

                <div className="profile-info">
                    <div className="profile-row">
                        <label>Email</label>
                        <div>{user.email}</div>
                    </div>
                    <div className="profile-row">
                        <label>Mobile number</label>
                        {isEditingPhone ? (
                            <form onSubmit={handlePhoneChange}>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <button type="submit">Save</button>
                            </form>
                        ) : (
                            <div>
                                {user.phoneNumber || "Not available"}
                                <button onClick={() => setIsEditingPhone(true)}>Edit</button>
                            </div>
                        )}
                    </div>
                    <div className="profile-row">
                        <label>First Name</label>
                        <span>{user.firstName}</span>
                    </div>
                    <div className="profile-row">
                        <label>Last Name</label>
                        <span>{user.lastName}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
