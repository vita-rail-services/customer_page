// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/LoginPage.css";
import logo from "../assets/logo.png";
import { axiosInstance } from '../utils/index.utils.js';
import toast from 'react-hot-toast';
import { useAuthStore } from "./../stores/index.stores.js";

function LoginPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const res = await axiosInstance.post('/auth/login', { userId, password });
      // alert("Login Successful");
      login(res.data.token, res.data.user);
      navigate('/zones');
    } catch (error) {
      toast.error( error?.response?.data?.message || "Login failed");
      console.error(error);
    } finally{
      setIsLoading(false)
    }
  };

  async function handleForgotPassword() {
    if(!userId){
      toast.error("Enter your userId & click forgot password");
      return
    }
    setIsLoading(true)
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { userId });
      if (res.data) {
        toast.success("Password reset link sent to your email");
      } else {
        toast.error("Failed to send password reset link");
      }
    } catch (err) {
      console.error("Error while handling forgot password:", err);
      toast.error("An error occurred while processing your request"); 
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Vita Rail Logo" className="login-logo" />
      </div>
      <div className="login-box">
        <h1 className="login-title">Vita Rail Services</h1>
        <p className="login-subtitle">Pick Your Food On Track</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button disabled={isLoading} type="submit">Login</button>
        </form>
        <div className="login-links">
          <Link to="/signup">Don't have an account? Sign Up</Link>
          <Link onClick={handleForgotPassword}>Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
