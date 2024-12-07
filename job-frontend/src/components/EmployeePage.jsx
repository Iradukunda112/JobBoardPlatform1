import React, { useState } from "react";

const EmployeePage = ({ employee = {}, applications = [], jobListings = [], onLogout }) => {
  // States for editable fields
  const [isAvailable, setIsAvailable] = useState(employee.isAvailable || false);
  const [email, setEmail] = useState(employee.email || "");
  const [phone, setPhone] = useState(employee.phone || "");
  const [linkedIn, setLinkedIn] = useState(employee.linkedIn || "");

  const handleAvailabilityToggle = () => {
    setIsAvailable(!isAvailable);
  };

  return (
    <div style={styles.container}>
      {/* Profile Overview Section */}
      <div style={styles.profileOverview}>
        <img src={employee.profilePicture || "/default-profile.png"} alt="Profile" style={styles.profileImage} />
        <div>
          <h2>{employee.name || "Guest"}</h2>
          <p><strong>Position:</strong> {employee.position || "Not Specified"}</p>
        </div>
      </div>

      {/* Skills Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>Skills</h2>
        <ul>
          {employee.skills && employee.skills.length > 0 ? (
            employee.skills.map((skill, index) => (
              <li key={index} style={styles.listItem}>
                {skill}
              </li>
            ))
          ) : (
            <li style={styles.listItem}>No skills listed.</li>
          )}
        </ul>
      </div>

      {/* Job History Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>Job History</h2>
        <ul>
          {employee.jobHistory && employee.jobHistory.length > 0 ? (
            employee.jobHistory.map((job, index) => (
              <li key={index} style={styles.listItem}>
                <strong>{job.role}</strong> at {job.company} ({job.years} years)
              </li>
            ))
          ) : (
            <li style={styles.listItem}>No job history available.</li>
          )}
        </ul>
      </div>

      {/* Availability Toggle */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>Availability</h2>
        <p>{isAvailable ? "You are currently available for new opportunities." : "You are currently unavailable."}</p>
        <button onClick={handleAvailabilityToggle} style={styles.button}>
          {isAvailable ? "Mark as Unavailable" : "Mark as Available"}
        </button>
      </div>

      {/* Contact Info Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>Contact Information</h2>
        <p><strong>Email:</strong> <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} /></p>
        <p><strong>Phone:</strong> <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} /></p>
        <p><strong>LinkedIn:</strong> <input type="text" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} style={styles.input} /></p>
      </div>

      {/* Job Application Status Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>Job Application Status</h2>
        <p>Here is the status of your job applications:</p>
        <ul>
          {applications.length > 0 ? (
            applications.map((application, index) => (
              <li key={index} style={styles.listItem}>
                <strong>{application.jobTitle}</strong> - {application.status}
              </li>
            ))
          ) : (
            <li style={styles.listItem}>No applications found.</li>
          )}
        </ul>
      </div>

      {/* Job Listings Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>Available Job Listings</h2>
        <p>Browse and apply for new positions within the company:</p>
        <ul>
          {jobListings.length > 0 ? (
            jobListings.map((job, index) => (
              <li key={index} style={styles.listItem}>
                <strong>{job.title}</strong> - {job.department} -{" "}
                <a href={`/jobs/${job.id}`} style={styles.button}>
                  View Job
                </a>
              </li>
            ))
          ) : (
            <li style={styles.listItem}>No job listings available.</li>
          )}
        </ul>
      </div>

      {/* Logout Button */}
      <button onClick={onLogout} style={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};

// Inline Styles for the React Component
const styles = {
  container: {
    width: "80%",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f7fc",
    padding: "20px",
  },
  profileOverview: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  profileImage: {
    borderRadius: "50%",
    width: "100px",
    height: "100px",
    marginRight: "20px",
  },
  section: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  sectionHeading: {
    color: "#007bff",
    marginBottom: "10px",
  },
  listItem: {
    margin: "10px 0",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    display: "inline-block",
    border: "none",
    cursor: "pointer",
  },
  logoutButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  input: {
    padding: "5px",
    marginTop: "5px",
    borderRadius: "5px",
    width: "200px",
    border: "1px solid #ccc",
  },
};

export default EmployeePage;
