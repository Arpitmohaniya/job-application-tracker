import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    applicationDate: "",
    status: "",
    jobLink: "",
    notes: "",
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === editingId ? { ...formData, id: editingId } : app
        )
      );
      setEditingId(null);
    } else {
      const newApp = { ...formData, id: uuidv4() };
      setApplications((prev) => [...prev, newApp]);
    }

    setFormData({
      companyName: "",
      jobTitle: "",
      applicationDate: "",
      status: "",
      jobLink: "",
      notes: "",
    });
  };

  const handleEdit = (app) => {
    setFormData(app);
    setEditingId(app.id);
  };

  const handleDelete = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <div className="container">
      <h1>Job Application Tracker</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="applicationDate"
          value={formData.applicationDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="status"
          placeholder="Status (e.g., Applied)"
          value={formData.status}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="jobLink"
          placeholder="Job Link"
          value={formData.jobLink}
          onChange={handleChange}
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Update" : "Add"} Application</button>
      </form>

      <h2>Applications</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Job Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Link</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.companyName}</td>
                <td>{app.jobTitle}</td>
                <td>{app.applicationDate}</td>
                <td>{app.status}</td>
                <td>
                  <a href={app.jobLink} target="_blank" rel="noreferrer">
                    View
                  </a>
                </td>
                <td>{app.notes}</td>
                <td>
                  <button onClick={() => handleEdit(app)}>Edit</button>
                  <button onClick={() => handleDelete(app.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
