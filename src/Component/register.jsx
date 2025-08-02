import React, { useState } from "react";
import axios from "axios";
import ToastMessage from "../../toast";
import { Link,useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate(); // ✅ Initialize navigation

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (formData.password.length < 6) newErrors.password = "Minimum 6 characters";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    try {
      // await axios.post("http://localhost:1000/api/v1/register", formData);
       await axios.post("https://todo-backend-ae05.onrender.com/api/v1/register", formData);
      setToast({ show: true, message: "Registered successfully", type: "success" });

      // ✅ Redirect after a short delay (optional)
      setTimeout(() => {
        navigate("/login");
      }, 2000);

      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setToast({ show: true, message: "Registration failed", type: "danger" });
    }
  };

  return (

    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100">
  <div className="card p-4 shadow-lg w-100 bg-secondary text-light" style={{ maxWidth: "500px", borderRadius: "1rem" }}>
    <h2 className="text-center mb-4 text-info fw-bold">Create an Account</h2>
    
    <form onSubmit={handleSubmit}>
      {["name", "email", "password"].map((field) => (
        <div className="mb-3" key={field}>
          <label className="form-label text-light">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type={field === "password" ? "password" : field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className={`form-control bg-dark text-light border-0 ${errors[field] ? "is-invalid" : ""}`}
            placeholder={`Enter your ${field}`}
          />
          {errors[field] && (
            <div className="invalid-feedback">{errors[field]}</div>
          )}
        </div>
      ))}
      <button className="btn btn-outline-info w-100 fw-semibold mt-3">
        Register
      </button>
    </form>

    <p className="text-center mt-3 text-light">
      Already have an account?{" "}
      <Link to="/login" className="text-info text-decoration-none fw-semibold">
        Login here
      </Link>
    </p>

    {toast.show && (
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false })}
        />
      </div>
    )}
  </div>
</div>
  );
};

export default RegisterForm;
