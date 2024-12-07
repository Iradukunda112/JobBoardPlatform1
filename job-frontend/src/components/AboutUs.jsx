import React, { useState } from "react";

const AboutUs = () => {
  const [page, setPage] = useState(1); // To track which page is being shown

  const page1Content = (
    <div className="content">
      <h2>About Us</h2>
      <p>
        Welcome to JobBoardPlatform! We are a leading platform for connecting job seekers and employers.
        Our mission is to make job hunting easier and more efficient.
      </p>
      <p>
        We provide a range of features to help job seekers create strong profiles, apply for jobs, and
        connect with employers in various industries.
      </p>
    </div>
  );

  const page2Content = (
    <div className="content">
      <h2>Our Vision</h2>
      <p>
        At JobBoardPlatform, our vision is to create a seamless experience for both job seekers and
        employers. We aim to bridge the gap between talent and opportunity by providing innovative
        tools and resources for career growth.
      </p>
      <p>
        Our platform also focuses on ensuring inclusivity and diversity in the job market by supporting
        various professional communities.
      </p>
    </div>
  );

  return (
    <div className="about-us-container">
      {page === 1 ? page1Content : page2Content}

      {/* Pagination controls */}
      <div className="pagination">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          Page 1
        </button>
        <button
          onClick={() => setPage(2)}
          disabled={page === 2}
        >
          Page 2
        </button>
      </div>

      {/* CSS Styles */}
      <style>
        {`
          .about-us-container {
            font-family: Arial, sans-serif;
            margin: 0 auto;
            padding: 20px;
            max-width: 800px;
          }

          h2 {
            color: #2c3e50;
          }

          .content {
            margin-bottom: 20px;
          }

          p {
            font-size: 1.1rem;
            color: #34495e;
          }

          .pagination {
            text-align: center;
            margin-top: 20px;
          }

          .pagination button {
            padding: 10px 20px;
            font-size: 1rem;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            margin: 0 10px;
            cursor: pointer;
          }

          .pagination button:disabled {
            background-color: #95a5a6;
            cursor: not-allowed;
          }

          .pagination button:hover:not(:disabled) {
            background-color: #2980b9;
          }
        `}
      </style>
    </div>
  );
};

export default AboutUs;
