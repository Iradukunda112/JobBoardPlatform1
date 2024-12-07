import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from "../assets/image/forgot.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Email is required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/forgot-password', { email });
      setMessage(response.data.message || 'Password reset link sent to your email!');
      
      // Navigate to the login page after sending the reset link
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to send reset link.');
    }
  };

  return (
    <div className="forgot-password-page">
      <style>
  {`
    body {
      font-family: 'Arial', sans-serif;
      background-image: url(${image});
      background-size: cover;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }

    .forgot-password-page {
      background-color: rgba(255, 255, 255, 0.6); /* Increased transparency */
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 100%;
      text-align: center;
      backdrop-filter: blur(12px); /* Slightly stronger blur */
    }

    h2 {
      font-size: 1.8em;
      color: #333;
      margin-bottom: 20px;
    }

    label {
      font-size: 1.2em;
      color: #555;
      margin-bottom: 10px;
      display: block;
      text-align: left;
    }

    input {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 16px;
      box-sizing: border-box;
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    input:hover {
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }

    input:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 8px rgba(0, 123, 255, 0.8);
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #0056b3;
    }

    .error {
      color: #e74c3c;
      font-size: 1.1em;
      margin-top: 10px;
    }

    .message {
      color: #2ecc71;
      font-size: 1.1em;
      margin-top: 10px;
    }

    p {
      font-size: 1.1em;
      margin-top: 20px;
    }

    a {
      color: #007bff;
      text-decoration: none;
      font-weight: bold;
    }

    a:hover {
      text-decoration: underline;
    }
  `}
</style>


      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email address:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
