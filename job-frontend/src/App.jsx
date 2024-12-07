import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login1 from './components/Login1';
import Register from "./components/register";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import AdminPage from "./components/AdminPage";
import AddNewUser from "./components/AddNewUser";
import SearchUser from "./components/SearchUser";  // Import SearchUser component
import UploadDocuments from "./components/UploadDocuments"; // Import UploadDocuments component
import ResetPassword from './components/ResetPassword';
import UploadSuccess from './components/UploadSuccess';
import UserList from "./components/UserList";
import EmployerDashboard from './components/EmployerDashboard'; // Adjust the path as needed
import EmployeePage from "./components/EmployeePage";
import AboutUs from './components/AboutUs'; 


import reactLogo from "./assets/react.svg";
import EditUserForm from './components/EditUserForm';
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        {/* Vite and React Logos */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
           
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
         
          </a>
        </div>

        {/* Main Title */}
       

        {/* Set up Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login1 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={<AdminPage />} /> {/* Admin Page route */}
          <Route path="/admin/add" element={<AddNewUser />} /> {/* Add New User route */}
          <Route path="/admin/search" element={<SearchUser />} /> {/* Search User route */}
          <Route path="/admin/users/edit/:userId" element={<EditUserForm />} />
          <Route path="/admin/upload" element={<UploadDocuments />} /> {/* Upload Documents route */}
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/success" element={<UploadSuccess />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employee/:id" element={<EmployeePage />} />
          <Route path="/about-us" element={<AboutUs />} /> {/* About Us route */}


        </Routes>

       
      </div>
    </Router>
  );
}

export default App;
