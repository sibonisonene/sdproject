import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return ReactDOM.createPortal(
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close-button" onClick={onClose}>X</button>
          {children}
        </div>
      </div>,
      document.getElementById('modal-root') // Ensure this ID matches the one in your index.html
    );
};

export default Modal;
