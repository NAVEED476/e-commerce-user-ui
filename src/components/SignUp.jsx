import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [user_data, setUser_data] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser_data({
      ...user_data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user_data)
    fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Registration successful:", data);
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate("/login");
        }, 3000); 
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <div className="signup-container">
      <div className="form-div">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            name="username"
            value={user_data.username}
            onChange={handleChange}
          />
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            name="email"
            value={user_data.email}
            onChange={handleChange}
          />
          <label htmlFor="Number">Number</label>
          <input
            type="number"
            name="mobile"
            value={user_data.mobile}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user_data.password}
            onChange={handleChange}
          />
          <button
            className="primary-button"
            disabled={
              !user_data.username.trim() ||
              !user_data.email.trim() ||
              !user_data.mobile.trim() ||
              !user_data.password.trim()
            }
          >
            Submit
          </button>
        </form>
        <p>
          Already have an Account? <Link to="/login">Sign In</Link>
        </p>
        {showSuccessPopup && (
          <div className="success-popup">
            <p style={{ color: "" }}>
              Registration successful! Redirecting to login...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
