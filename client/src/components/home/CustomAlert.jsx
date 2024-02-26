import React, { useState } from 'react';
import './CustomAlert.css';

const CustomAlert = ({ children, onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
          {children}
        </div>
      </div>
    );
  };

export default CustomAlert;
