import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../assets/image/register.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'ROLE_USER'
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/api/register', formData);
      if (response.status === 200) {
        setMessage('Registration successful!');
        setFormData({
          username: '',
          email: '',
          password: '',
          role: 'ROLE_USER'
        });
        
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
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

          .register-container {
            backdrop-filter: blur(10px); /* Blur effect */
            background-color: rgba(255, 255, 255, 0.15); /* Semi-transparent white */
            border-radius: 16px;
            padding: 30px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Soft shadow */
            width: 100%;
            max-width: 400px;
            border: 1px solid rgba(255, 255, 255, 0.3); /* Subtle border */
          }

          h2 {
            text-align: center;
            font-size: 2em;
            margin-bottom: 20px;
            color: #fff; /* White text for contrast */
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5); /* Text shadow for readability */
          }

          .register-container input,
          .register-container select {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
          }

          .register-container button {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.2s;
          }

          .register-container button:hover {
            background-color: #0056b3;
            transform: scale(1.05); /* Slight hover effect */
          }

          .message {
            text-align: center;
            color: green;
            margin-bottom: 20px;
          }

          .error {
            text-align: center;
            color: red;
            margin-bottom: 20px;
          }

          a {
            color: #007bff;
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
          }

          p {
            text-align: center;
            font-size: 14px;
            color: #fff; /* White text for links */
          }
        `}
      </style>

      <div className="register-container">
        <h2>Register</h2>

        {message && <div className="message">{message}</div>}

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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="ROLE_USER">Employee</option>
            <option value="ROLE_ADMIN">Admin</option>
            <option value="ROLE_Employee">Employer</option>
          </select>

          <button type="submit">Register</button>
        </form>

        {error && <div className="error">{error}</div>}

        <p><a href="/login">Already have an account? Log in</a></p>
      </div>
    </div>
  );
};

export default Register;
