import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminPage = () => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications (mocked for now)
  useEffect(() => {
    // Replace with actual API calls
    setNotifications([
      { message: 'New user registered', timestamp: new Date(), read: false },
      { message: 'Password updated', timestamp: new Date(), read: true },
    ]);
  }, []);

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'User Registrations',
        data: [30, 45, 60, 20, 75],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly User Registrations',
      },
    },
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Left Sidebar */}
        <div className="col-md-3 bg-light p-4">
          <h5>Admin Panel</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <Link to="/admin/users" className="nav-link">User Management</Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/admin/notifications" className="nav-link">Notifications</Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/admin/reports" className="nav-link">Reports</Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/admin/add" className="btn btn-primary">Add New User</Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/admin/search" className="btn btn-primary">Search User</Link>
            </li>
            {/* Updated button to navigate to UploadDocuments page */}
            <li className="nav-item mb-3">
              <Link to="/admin/upload" className="btn btn-primary">Upload File</Link>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="col-md-9">
          <header className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
              <a href="/user/profile" className="d-flex align-items-center me-3">
                <img src="https://via.placeholder.com/150" alt="Profile" className="profile-icon" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
              </a>
              <a href="/logout" className="btn btn-danger">Logout</a>
            </div>
          </header>

          <h3>Admin Dashboard</h3>
          <hr />

          {/* Chart Section */}
          <div className="mb-4">
            <h5>Monthly User Registrations</h5>
            <Bar data={chartData} options={chartOptions} />
          </div>

          {/* Notifications Section */}
          <div className="mb-4">
            <h5>Notifications</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Message</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification, index) => (
                  <tr key={index}>
                    <td>{notification.message}</td>
                    <td>{new Date(notification.timestamp).toLocaleString()}</td>
                    <td>{notification.read ? 'Read' : 'Unread'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleClearNotifications} className="btn btn-secondary">Clear All Notifications</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
