import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "./../utils/index.utils.js";
import "./../styles/x.css"; // Adjust path and casing if needed
import toast from "react-hot-toast";
import logo from "./../assets/logo.png";  // Import your logo image

export default function PasswordReset() {
  const navigate = useNavigate();
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPass !== confirmPass) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!token) {
      toast.error("Invalid token");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/reset-password", {
        newPassword: newPass,
        token,
      });

      if (res.data) {
        toast.success("Password reset successful");
        navigate("/");
      } else {
        toast.error("Password reset failed");
      }
    } catch (err) {
      console.error("Error while resetting password:", err);
      toast.error("An error occurred while processing your request");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        {/* Logo centered */}
        <img src={logo} alt="Logo" className="reset-logo" />

        <h2 className="reset-title">Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="newpass">New Password</label>
          <input
            className="reset-input"
            type="password"
            id="newpass"
            placeholder="Enter new password"
            required
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />

          <label htmlFor="confirmpass">Confirm Password</label>
          <input
            className="reset-input"
            type="password"
            id="confirmpass"
            placeholder="Confirm new password"
            required
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />

          <button className="reset-button" type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
