import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [lists, setLists] = useState([]);
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  //const url = "http://localhost:1000/api/v1/list"
  const url = "https://todo-backend-ma0w.onrender.com/api/v1/list"



  // Fetch user's list items
  const fetchLists = async () => {
    try {
      const res = await axios.get(url, {
        headers,
      });
      setLists(res.data || []);
    } catch (error) {
      console.error("Error fetching lists:", error);
      setError("Failed to load tasks.");
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.body) return;

    try {
      if (editId) {
        await axios.put(
          `${url}/${editId}`,
          formData,
          { headers }
        );
        setEditId(null);
      } else {
        await axios.post(url, formData, {
          headers,
        });
      }

      setFormData({ title: "", body: "" });
      fetchLists();
    } catch (err) {
      console.error("Error saving todo:", err);
      setError("Could not save task.");
    }
  };

  const handleEdit = (item) => {
    setFormData({ title: item.title, body: item.body });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/${id}`, {
        headers,
      });
      fetchLists();
    } catch (err) {
      console.error("Failed to delete item:", err);
      setError("Could not delete task.");
    }
  };

  return (
    <div className="container py-5 bg-dark text-light min-vh-100">
    <div className="row justify-content-center">
    <div className="col-md-10">
      <h2 className="text-center mb-4 text-primary fw-bold">My To-Do List</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control bg-secondary text-white border-0"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control bg-secondary text-white border-0"
            name="body"
            rows="3"
            placeholder="Task description"
            value={formData.body}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-outline-light w-100 fw-semibold">
          {editId ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      <div className="table-responsive rounded shadow">
        <table className="table table-dark table-striped table-bordered align-middle text-center">
          <thead className="table-primary text-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-warning me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {lists.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

  );
};

export default TodoList;
