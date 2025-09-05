// components/LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");

    // Navigate to homepage
    navigate("/");

    // Optionally reload the page to refresh Navbar state
    window.location.reload();
  };

  return (
    <button className="menuBtn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
