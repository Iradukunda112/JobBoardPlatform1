import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserForm = ({ userId }) => {
  const [user, setUser] = useState({
    id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: '',
  });

  const [message, setMessage] = useState('');

  // Fetch user details when the component mounts
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/admin/users/${userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          setMessage('Error fetching user data');
        });
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/admin/users/update', user);
      setMessage('User updated successfully!');
    } catch (error) {
      setMessage('Error updating user');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit User</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={user.id} />
        
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={user.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            className="form-control"
            value={user.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            value={user.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            value={user.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="form-control"
            value={user.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            id="role"
            name="role"
            className="form-select"
            value={user.role}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Select a role</option>
            <option value="ROLE_USER">Customer</option>
            <option value="ROLE_SELLER">Seller</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditUserForm;
