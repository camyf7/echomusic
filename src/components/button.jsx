// src/components/ui/button.jsx
import React from "react";

export function Button({ children, className = "", onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors 
      bg-indigo-600 hover:bg-indigo-700 text-white ${className}`}
    >
      {children}
    </button>
  );
}
