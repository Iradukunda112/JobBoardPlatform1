import React, { useState, useEffect } from "react";
import axios from "axios";

const AddNewUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      if (isEditing) {
        const response = await axios.put(
          `http://localhost:8080/admin/users/${editingUserId}`,
          formData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          setSuccess("User updated successfully!");
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === editingUserId ? response.data : user
            )
          );
        }
      } else {
        const response = await axios.post(
          "http://localhost:8080/admin/users",
          formData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          setSuccess("User added successfully!");
          setUsers((prevUsers) => [...prevUsers, response.data]);
        }
      }

      setFormData({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        role: "",
      });
      setIsEditing(false);
      setEditingUserId(null);
    } catch (error) {
      console.error("Error while submitting:", error);
      setError(error.response?.data?.message || "Failed to save user.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      password: "", // Reset password for security reasons
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });
    setIsEditing(true);
    setEditingUserId(user.id);
  };

  const handleDelete = async (userId) => {
    setError("");
    setSuccess("");

    try {
      const response = await axios.delete(`http://localhost:8080/admin/users/${userId}`);

      if (response.status === 200) {
        setSuccess("User deleted successfully!");
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.response?.data?.message || "Failed to delete user.");
    }
  };

  return (
    <div className="add-user-page">
      <h2>{isEditing ? "Edit User" : "Add New User"}</h2>

      <div className="add-user-container">
        {success && <div className="message">{success}</div>}
        {error && <div className="error">{error}</div>}

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {!isEditing && (
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            )}
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
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
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a role</option>
              <option value="ROLE_USER">Employee</option>
              <option value="ROLE_Employee">Employer</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : isEditing ? "Update User" : "Add User"}
            </button>
          </form>
        </div>

        <div className="user-table-container">
          <h3>Users List</h3>
          <table className="user-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No users available
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => handleEdit(user)}>Edit</button>
                      <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>
        {`
        .add-user-page {
          font-family: Arial, sans-serif;
          padding: 20px;
        }
        .add-user-container {
          display: flex;
          gap: 30px;
          justify-content: space-between;
        }
        .form-container, .user-table-container {
          flex: 1;
        }
        h2, h3 {
          color: #333;
          text-align: center;
        }
        form {
          display: grid;
          gap: 15px;
        }
        input, select, button {
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        input[type="text"], input[type="email"], select {
          width: 100%;
        }
        button {
          background-color: #4CAF50;
          color: white;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:disabled {
          background-color: #ccc;
        }
        button:hover:not(:disabled) {
          background-color: #45a049;
        }
        .message, .error {
          padding: 10px;
          text-align: center;
          margin-bottom: 20px;
          border-radius: 5px;
        }
        .message {
          background-color: #d4edda;
          color: #155724;
        }
        .error {
          background-color: #f8d7da;
          color: #721c24;
        }
        .user-table {
          width: 100%;
          border-collapse: collapse;
        }
        .user-table th, .user-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }
        .user-table th {
          background-color: #f2f2f2;
        }
        .user-table button {
          padding: 5px 10px;
          background-color: #ff9800;
          color: white;
          border: none;
          cursor: pointer;
        }
        .user-table button:hover {
          background-color: #e68900;
        }
        `}
      </style>
    </div>
  );
};

export default AddNewUser;
