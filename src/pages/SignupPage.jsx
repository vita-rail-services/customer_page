import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/SignupPage.css";
import logo from "../assets/logo.png";
import { axiosInstance } from "../utils/index.utils.js";
import toast from 'react-hot-toast';
import { useAuthStore } from "./../stores/index.stores.js";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    dob: "",
    name: "",
    userId: "",
    password: ""
  });
  const { login } = useAuthStore();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/auth/signup', formData);
      login(res.data.token, res.data.user);
      // toast.success("Signup Successful");
      navigate("/zones");
    } catch (err) {
      console.error("Signup failed:", err);
      toast.error( err?.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <img src={logo} alt="Vita Rail Logo" className="signup-logo" />
      </div>

      <div className="signup-box">
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join Vita Rail Services</p>
        <form onSubmit={handleSignup}>
          <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} required />
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input type="text" name="userId" placeholder="User ID" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Sign Up</button>
        </form>
        <div className="signup-links">
          <Link to="/">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
