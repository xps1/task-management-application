// src/components/Modal.js

import React from 'react';
import 'tailwindcss/tailwind.css';

export const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        {children}
        <button onClick={onClose} className="mt-4 p-2 bg-red-500 text-white rounded">Close</button>
      </div>
    </div>
  );
};
