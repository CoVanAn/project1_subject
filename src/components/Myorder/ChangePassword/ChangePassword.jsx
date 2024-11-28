import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import './ChangePassword.scss';
import StoreContextProvider, {StoreContext} from "../../../context/StoreContext";

const ChangePassword = () => {

    const {fetchUser, user, setUser } = useContext(StoreContext);
    // const [user, setUser] = useState({});


    console.log(user);

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setPasswords((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
            setError("Vui lòng nhập đầy đủ thông tin.");
            return;
        }
        
        if(user.password !== passwords.currentPassword){
            setError("Mật khẩu cũ không đúng");
            return;
        }
        if (passwords.newPassword !== passwords.confirmPassword) {
            setError("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }

        const formData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: passwords.newPassword,
            phoneNumber: user.phoneNumber,
            role: user.role,
        };
        

        console.log("formdata: ",formData);
     

        try {
            const response = await axios.put("http://localhost:8080/api/users/5", formData);
            // Nếu thành công, hiển thị thông báo thành công
            setSuccessMessage("Mật khẩu đã được thay đổi thành công.");
            setError("");  // Xóa lỗi nếu có
        } catch (error) {
            const serverError = error.response?.data?.message || "Lỗi xảy ra khi thay đổi mật khẩu.";
            setError(serverError);
            console.error("Error details:", error.response?.data);
        }
        
    };

    return (
        <div className="change-password-page">
            <h2>Thay đổi mật khẩu</h2>
            <form id="change-password-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="currentPassword">Mật khẩu cũ</label>
                    <div className="password-wrapper">
                        <input
                            type={showPasswords.current ? "text" : "password"}
                            id="currentPassword"
                            placeholder="Nhập mật khẩu cũ"
                            value={passwords.currentPassword}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => togglePasswordVisibility("current")}
                        >
                            {showPasswords.current ? "Ẩn" : "Hiện"}
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">Mật khẩu mới</label>
                    <div className="password-wrapper">
                        <input
                            type={showPasswords.new ? "text" : "password"}
                            id="newPassword"
                            placeholder="Nhập mật khẩu mới"
                            value={passwords.newPassword}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => togglePasswordVisibility("new")}
                        >
                            {showPasswords.new ? "Ẩn" : "Hiện"}
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
                    <div className="password-wrapper">
                        <input
                            type={showPasswords.confirm ? "text" : "password"}
                            id="confirmPassword"
                            placeholder="Nhập lại mật khẩu mới"
                            value={passwords.confirmPassword}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => togglePasswordVisibility("confirm")}
                        >
                            {showPasswords.confirm ? "Ẩn" : "Hiện"}
                        </button>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}

                <button type="submit" className="change-password-btn">Thay đổi mật khẩu</button>
            </form>
        </div>
    );
};

export default ChangePassword;
