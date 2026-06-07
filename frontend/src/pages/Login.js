import {
  useState,
  useContext
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import api from "../api/axios";

import {
  AuthContext
} from "../context/AuthContext";

import "./Login.css";

const Login = () => {

  const navigate =
    useNavigate();

  const {
    login
  } = useContext(
    AuthContext
  );

  const [formData,
    setFormData
  ] = useState({
    email: "",
    password: ""
  });

  const handleChange = (
    e
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value
    });

  };

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    try {

      const res =
        await api.post(
          "/auth/login",
          formData
        );

      login(
        res.data.user,
        res.data.token
      );

      const role =
        res.data.user.role;

      if (
        role === "ADMIN"
      ) {
        navigate("/admin");
      }
      else if (
        role ===
        "STORE_OWNER"
      ) {
        navigate("/owner");
      }
      else {
        navigate("/stores");
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h1>
          Store Rating App
        </h1>

        <p className="subtitle">
          Sign in to continue
        </p>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className="input-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={
                handleChange
              }
              required
            />

          </div>

          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={
                handleChange
              }
              required
            />

          </div>

          <button
            className="login-btn"
            type="submit"
          >
            Login
          </button>

        </form>

        <p className="register-text">

          Don't have an account?

          <Link
            to="/Signup"
            className="register-link"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );
};

export default Login;