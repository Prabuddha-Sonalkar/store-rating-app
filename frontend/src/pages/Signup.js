import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Signup.css";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/auth/register",
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
          password: formData.password
        }
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      console.log("Signup Error:", error);

      alert(
        error.response?.data?.message ||
        error.response?.data?.errors?.join("\n") ||
        "Registration Failed"
      );

    }

  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        <h1>Store Rating App</h1>

        <p className="subtitle">
          Create your account
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Full Name"
              required
            />

          </div>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
            />

          </div>

          <div className="input-group">

            <label>Address</label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
              required
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />

          </div>

          <button
            type="submit"
            className="signup-btn"
          >
            Register
          </button>

        </form>

        <p className="login-text">

          Already have an account?

          <Link
            to="/login"
            className="login-link"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;