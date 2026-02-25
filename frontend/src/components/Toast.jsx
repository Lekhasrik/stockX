import { useState, useEffect } from "react";

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return { toast, showToast };
};

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: "bg-gradient-to-r from-green-500 to-green-400",
    error: "bg-gradient-to-r from-red-500 to-red-400",
    warning: "bg-gradient-to-r from-yellow-500 to-yellow-400",
    info: "bg-gradient-to-r from-ocean-500 to-teal-500"
  }[type] || "bg-gray-500";

  const icon = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️"
  }[type] || "📌";

  return (
    <div className="fixed top-20 right-4 z-50 animate-slideIn">
      <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px]`}>
        <span className="text-2xl">{icon}</span>
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Toast;
