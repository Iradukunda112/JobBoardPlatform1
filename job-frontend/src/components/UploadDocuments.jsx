import React, { useState, useEffect } from "react";

const UploadDocuments = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // Track type of message (success/error)
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Fetch uploaded files from the backend
  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/uploadDocument");
      if (!response.ok) throw new Error("Failed to fetch uploaded files.");
      const data = await response.json();
      setUploadedFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
      setMessage("Error fetching uploaded files.");
      setMessageType("error");
    }
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.file.files[0];

    if (!file) return;

    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("File upload failed.");

      setMessage("File uploaded successfully!");
      setMessageType("success");
      fetchUploadedFiles(); // Refresh the list of files after upload
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
      setMessageType("error");
    }
  };

  const handleDeleteFile = async (fileName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/delete/${fileName}`,
        { method: "POST" }
      );

      if (!response.ok) throw new Error("File deletion failed.");

      setMessage("File deleted successfully!");
      setMessageType("success");
      fetchUploadedFiles(); // Refresh the list of files after deletion
    } catch (error) {
      console.error("Error deleting file:", error);
      setMessage("Error deleting file.");
      setMessageType("error");
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#343a40",
          borderBottom: "2px solid #007bff",
          paddingBottom: "10px",
          marginBottom: "30px",
        }}
      >
        Upload a Document
      </h1>

      {message && (
        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: `1px solid ${
              messageType === "success" ? "#28a745" : "#dc3545"
            }`,
            borderRadius: "5px",
            backgroundColor:
              messageType === "success" ? "#d4edda" : "#f8d7da",
            color: messageType === "success" ? "#155724" : "#721c24",
          }}
        >
          <p style={{ margin: 0 }}>{message}</p>
        </div>
      )}

      <form
        onSubmit={handleFileUpload}
        encType="multipart/form-data"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <label
          htmlFor="file"
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#495057",
          }}
        >
          Choose file to upload:
        </label>
        <input
          type="file"
          name="file"
          id="file"
          required
          style={{
            padding: "5px",
            borderRadius: "4px",
            border: "1px solid #ced4da",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Upload
        </button>
      </form>

      {uploadedFiles.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2
            style={{
              textAlign: "center",
              color: "#343a40",
              marginBottom: "20px",
            }}
          >
            Uploaded Files
          </h2>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {uploadedFiles.map((file) => (
              <li
                key={file}
                style={{
                  backgroundColor: "#e9ecef",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1, marginRight: "10px" }}>
                  <a
                    href={`http://localhost:8080/admin/view/${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#007bff",
                      fontWeight: "bold",
                    }}
                  >
                    View
                  </a>{" "}
                  |{" "}
                  <a
                    href={`http://localhost:8080/admin/download/${file}`}
                    download
                    style={{
                      textDecoration: "none",
                      color: "#007bff",
                      fontWeight: "bold",
                    }}
                  >
                    Download
                  </a>
                </div>
                <button
                  onClick={() => handleDeleteFile(file)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;
