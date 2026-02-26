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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 200);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const themes = {
    success: { bg: "bg-white", border: "border-emerald-200", icon: "text-emerald-500", bar: "bg-emerald-500" },
    error:   { bg: "bg-white", border: "border-red-200",     icon: "text-red-500",     bar: "bg-red-500" },
    warning: { bg: "bg-white", border: "border-amber-200",   icon: "text-amber-500",   bar: "bg-amber-500" },
    info:    { bg: "bg-white", border: "border-blue-200",    icon: "text-blue-500",    bar: "bg-blue-500" },
  };
  const t = themes[type] || themes.info;

  const icons = {
    success: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    error: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    warning: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>,
    info: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  };

  return (
    <div className={`fixed top-20 right-4 z-50 transition-all duration-300 ${visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>
      <div className={`${t.bg} ${t.border} border rounded-xl shadow-lg overflow-hidden min-w-[320px]`}>
        <div className={`h-0.5 ${t.bar}`} />
        <div className="flex items-center gap-3 px-4 py-3">
          <span className={t.icon}>{icons[type] || icons.info}</span>
          <span className="text-sm font-medium text-gray-700 flex-1">{message}</span>
          <button onClick={() => { setVisible(false); setTimeout(onClose, 200); }} className="text-gray-300 hover:text-gray-500 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toast;