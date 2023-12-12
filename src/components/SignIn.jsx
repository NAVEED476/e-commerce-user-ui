import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const url = "http://localhost:5000/auth/login";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data._id);

        navigate("/products");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="form-div">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="primary-button">
            Submit
          </button>
        </form>

        <p>
          New here? <Link to="/signup">Create an Account</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
