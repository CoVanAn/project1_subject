import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import StoreContextProvider, { StoreContext } from "../../context/StoreContext";
import "./LoginPopup.scss";

const LoginPopup = ({setShowLogin}) => {

    const {setToken, token, user, fetchUser} = useContext(StoreContext);
    const [currState, setCurrState] = useState('Login')

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái login

    const handleLogin = async (e) => {
        e.preventDefault();
        
        setError(""); // Reset lỗi trước khi gửi yêu cầu

        let newUrl = ""
        if(currState==="Login"){
          newUrl = `http://localhost:8080/login`
        }else{
          newUrl = `http://localhost:8080/api/users/add`
        }

        try { 
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }), 
            });

            if (!response.ok) {
                setError("Invalid username or password.");
                return;
            }


            const data = await response.json();

            if (data.userRole === "CUSTOMER") {
                // Lưu thông tin vào localStorage
                localStorage.setItem("customerToken", data.token);
                localStorage.setItem("userId", data.userId);

                // In dữ liệu ra console
                console.log({
                    token: data.token,
                    userId: data.userId,
                    userRole: data.userRole,
                });
                setToken(data.token);
                // await fetchUser(data.userId);

                // Đánh dấu trạng thái login thành công và đóng form
                setIsLoggedIn(true);

                setShowLogin(false);
                
                // Điều hướng đến dashboard (hoặc trang khác)
                navigate("/");
            } else {
                setError("You are not a customer. Access denied.");
            }
        } catch (error) {
            setError("Server error. Please try again later.");
        }
    };

    return (

        <div className="login-container">
            {!isLoggedIn && ( // Nếu chưa login thành công mới hiển thị form
                <form className="login-form" onSubmit={handleLogin}>
                    <h2 className="login-title">{currState}</h2>
                    <button className="close-button" onClick={() => setShowLogin(false)}>X</button>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="username" className="label">Username:</label>
                        <input
                            type="text"
                            id="username"
                            className="input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            )}
        </div>
    );
};

export default LoginPopup;
