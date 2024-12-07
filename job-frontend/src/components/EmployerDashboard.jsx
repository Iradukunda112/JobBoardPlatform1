import React, { useEffect, useState } from "react";
import axios from "axios";
import image from "../assets/image/second.jpg";

const EmployerDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [editingJob, setEditingJob] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState("asc");
    const [filter, setFilter] = useState("");
    const [filterType, setFilterType] = useState("title");

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/employer/jobs");
            setJobs(response.data);
            setFilteredJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setMessage("Failed to load jobs. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handlePostJob = async (event) => {
        event.preventDefault();
        const newJob = {
            title: event.target.title.value,
            description: event.target.description.value,
            location: event.target.location.value,
            jobType: event.target.jobType.value,
        };

        try {
            const response = await axios.post("http://localhost:8080/employer/jobs", newJob);
            if (response.status === 201) {
                setMessage("Job posted successfully!");
                setJobs((prevJobs) => [...prevJobs, response.data]);
                setFilteredJobs((prevJobs) => [...prevJobs, response.data]);
                event.target.reset();
            }
        } catch (error) {
            console.error("Error posting job:", error.response ? error.response.data : error.message);
            setMessage("Failed to post job. Please try again later.");
        }
    };

    const handleUpdateJob = async (event) => {
        event.preventDefault();
        const updatedJob = {
            id: editingJob.id,
            title: event.target.title.value,
            description: event.target.description.value,
            location: event.target.location.value,
            jobType: event.target.jobType.value,
        };

        try {
            const response = await axios.put(
                `http://localhost:8080/employer/jobs/${editingJob.id}`,
                updatedJob
            );
            if (response.status === 200) {
                setMessage("Job updated successfully!");
                fetchJobs();
                setEditingJob(null);
            }
        } catch (error) {
            console.error("Error updating job:", error.response ? error.response.data : error.message);
            setMessage("Failed to update job. Please try again later.");
        }
    };

    const handleDeleteJob = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/employer/jobs/${id}`);
            if (response.status === 200) {
                setMessage("Job deleted successfully!");
                fetchJobs();
            }
        } catch (error) {
            console.error("Error deleting job:", error.response ? error.response.data : error.message);
            setMessage("Failed to delete job. Please try again later.");
        }
    };

    const sortJobsByTitle = () => {
        const sortedJobs = [...filteredJobs].sort((a, b) =>
            sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        );
        setFilteredJobs(sortedJobs);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        const filtered = jobs.filter((job) =>
            job[filterType].toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredJobs(filtered);
    };

    const handleFilterTypeChange = (event) => {
        setFilterType(event.target.value);
        setFilter("");
        setFilteredJobs(jobs);
    };

    return (
        <div className="dashboard">
            <header>
                <h1>Employer Dashboard</h1>
                <p>Manage your job postings below.</p>
            </header>

            {message && <div className="message">{message}</div>}

            <div className="content">
                <div className="form-container">
                    <h2>{editingJob ? "Edit Job" : "Post a New Job"}</h2>
                    <form onSubmit={editingJob ? handleUpdateJob : handlePostJob}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Job Title"
                            defaultValue={editingJob?.title || ""}
                            required
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Job Description"
                            defaultValue={editingJob?.description || ""}
                            required
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            defaultValue={editingJob?.location || ""}
                            required
                        />
                        <select name="jobType" defaultValue={editingJob?.jobType || ""} required>
                            <option value="">Select Job Type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>
                        <button type="submit">{editingJob ? "Update Job" : "Post Job"}</button>
                    </form>
                </div>

                <div className="table-container">
                    <div className="filter-bar">
                        <input
                            type="text"
                            placeholder={`Search by ${filterType}`}
                            value={filter}
                            onChange={handleFilterChange}
                        />
                        <select value={filterType} onChange={handleFilterTypeChange}>
                            <option value="title">Title</option>
                            <option value="location">Location</option>
                            <option value="jobType">Job Type</option>
                        </select>
                    </div>

                    <h2>Your Posted Jobs</h2>
                    {loading ? (
                        <p>Loading jobs...</p>
                    ) : (
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th onClick={sortJobsByTitle} style={{ cursor: "pointer" }}>
                                        Title <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    </th>
                                    <th>Description</th>
                                    <th>Location</th>
                                    <th>Job Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredJobs.map((job) => (
                                    <tr key={job.id}>
                                        <td>{job.title}</td>
                                        <td>{job.description}</td>
                                        <td>{job.location}</td>
                                        <td>{job.jobType}</td>
                                        <td>
                                            <button onClick={() => setEditingJob(job)}>Edit</button>
                                            <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <style jsx>{`
                .dashboard {
                    padding: 20px;
                   background-image: url(${image});
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                header {
                    text-align: center;
                    width: 100%;
                    margin-bottom: 20px;
                }

                .message {
                    padding: 10px;
                    background-color: #e0f7fa;
                    border-radius: 5px;
                    margin-bottom: 15px;
                    text-align: center;
                    color: #00796b;
                }

                .content {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .form-container, .table-container {
                    width: 100%;
                    padding: 20px;
                    margin-bottom: 20px;
                }

                .form-container form input,
                .form-container form select,
                .form-container form button {
                    display: block;
                    width: 100%;
                    margin: 8px 0;
                    padding: 10px;
                    font-size: 14px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }

                .table-container .filter-bar {
                    margin-bottom: 20px;
                    display: flex;
                    gap: 10px;
                }

                .table-container .filter-bar input,
                .table-container .filter-bar select {
                    padding: 10px;
                    font-size: 14px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    width: 150px;
                }

                .custom-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .custom-table th, .custom-table td {
                    padding: 10px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                    font-size: 14px;
                }

                .custom-table th {
                    background-color: #00796b;
                    color: white;
                }

                .custom-table tr:hover {
                    background-color: #f1f1f1;
                }

                button {
                    padding: 8px 16px;
                    background-color: #00796b;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 12px;
                }

                button:hover {
                    background-color: #004d40;
                }

                @media (max-width: 768px) {
                    .form-container, .table-container {
                        width: 100%;
                    }

                    .custom-table th,
                    .custom-table td {
                        font-size: 12px;
                        padding: 8px;
                    }
                }
            `}</style>
        </div>
    );
};

export default EmployerDashboard;
