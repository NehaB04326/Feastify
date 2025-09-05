import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const url = isAdmin
      ? "http://localhost:4000/api/v1/admin/login"
      : "http://localhost:4000/api/v1/user/login";

    try {
      const { data } = await axios.post(url, { email, password });
      toast.success(data.message);

      if (isAdmin) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      } else {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "26px",
            fontWeight: "bold",
          }}
        >
          Login
        </h2>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "15px",
            }}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "15px",
            }}
          />
          <label style={{ fontSize: "14px", display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
              style={{ marginRight: "8px" }}
            />
            Login as Admin
          </label>
          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#ff6b6b",
              border: "none",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
