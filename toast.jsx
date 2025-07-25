import React from "react";

const ToastMessage = ({ message, type = "success", onClose }) => {
  return (
    <div className={`toast align-items-center text-bg-${type} border-0 show`} role="alert">
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default ToastMessage;
