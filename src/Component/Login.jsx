import React, { useState } from "react";
import axios from "axios";
import ToastMessage from "../../toast";
import { Link, useNavigate } from "react-router-dom"; // ✅ Link added

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (formData.password.length < 6) newErrors.password = "Minimum 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      //const res = await axios.post("http://localhost:1000/api/v1/login", formData);
      const res = await axios.post("https://todo-backend-ae05.onrender.com/api/v1/login", formData);
      setToast({ show: true, message: "Login successful", type: "success" });
      localStorage.setItem("token", res.data.token);

      setTimeout(() => {
        navigate("/list");
      }, 1000);
    } catch (err) {
      setToast({ show: true, message: "Login failed", type: "danger" });
    }
  };

  return (
   <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100">
  <div className="card p-4 shadow-lg w-100 bg-secondary text-light" style={{ maxWidth: "500px" }}>
    <h2 className="text-center mb-4 text-success text-light">Login</h2>
    <form onSubmit={handleSubmit}>
      {["email", "password"].map((field) => (
        <div className="mb-3" key={field}>
          <label className="form-label text-light">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type={field === "password" ? "password" : "email"}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className={`form-control bg-dark text-light border-secondary ${
              errors[field] ? "is-invalid" : ""
            }`}
          />
          {errors[field] && (
            <div className="invalid-feedback">{errors[field]}</div>
          )}
        </div>
      ))}
      <button className="btn btn-success w-100 mt-3 text-light">Login</button>
    </form>

    <p className="text-center mt-3 text-light">
      Don’t have an account?{" "}
      <Link to="/" className="text-info text-decoration-none fw-semibold">
        Register here
      </Link>
    </p>

    {toast.show && (
      <div
        className="position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false })}
        />
      </div>
    )}
  </div>
</div>
  )
};

export default LoginForm;
