import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../assets/image/login.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/login", formData);

      if (response.data) {
        const { role } = response.data;

        // Save user info in local storage
        localStorage.setItem("user", JSON.stringify(response.data));

        // Redirect based on role
        switch (role) {
          case "ROLE_ADMIN":
            navigate("/admin");
            break;
          case "ROLE_Employee":
            navigate("/employer/dashboard");
            break;
          case "ROLE_USER":
            navigate("/employee");
            break;
          default:
            navigate("/");
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background-image: url(${image});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
          }

          .login-container {
            background: rgba(255, 255, 255, 0.1); /* Low-opacity background */
            backdrop-filter: blur(15px); /* Frosted glass effect */
            border-radius: 16px;
            padding: 30px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 400px;
            border: 1px solid rgba(255, 255, 255, 0.2); /* Subtle border */
            margin: 10px;
          }

          h2 {
            text-align: center;
            font-size: 2em;
            margin-bottom: 20px;
            color: #fff;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
          }

          .login-container input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            background-color: rgba(255, 255, 255, 0.2); /* Transparent input background */
            color: #fff;
          }

          .login-container input::placeholder {
            color: rgba(255, 255, 255, 0.7); /* Placeholder color */
          }

          .login-container button {
            width: 100%;
            padding: 12px;
            background-color: rgba(0, 123, 255, 0.8);
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.2s;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .login-container button:hover {
            background-color: rgba(0, 123, 255, 1);
            transform: translateY(-3px);
          }

          .error {
            text-align: center;
            color: red;
            margin-bottom: 20px;
            font-size: 14px;
          }

          p {
            text-align: center;
            font-size: 14px;
            color: #fff;
            margin-top: 20px;
          }

          a {
            color: #007bff;
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
          }

          /* Responsive design */
          @media (max-width: 768px) {
            .login-container {
              padding: 20px;
              max-width: 90%;
            }

            h2 {
              font-size: 1.5em;
            }

            .login-container input {
              font-size: 14px;
              padding: 10px;
            }

            .login-container button {
              font-size: 14px;
              padding: 10px;
            }

            p {
              font-size: 12px;
            }
          }

          @media (max-width: 480px) {
            .login-container {
              max-width: 100%;
              padding: 15px;
            }

            h2 {
              font-size: 1.3em;
            }

            .login-container input {
              font-size: 12px;
              padding: 8px;
            }

            .login-container button {
              font-size: 12px;
              padding: 8px;
            }

            p {
              font-size: 10px;
            }
          }
        `}
      </style>

      <div className="login-container">
        <h2>Login</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p>
          <a href="/register">Don't have an account? Register</a>
        </p>

        {/* Forgot Password Link */}
        <p>
          <a href="/forgot-password">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
