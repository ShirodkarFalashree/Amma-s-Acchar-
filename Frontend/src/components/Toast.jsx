import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

const Toast = ({ message, type, duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!isVisible || !message) return null;

  const styleMap = {
    success: { bg: 'bg-green-500', icon: CheckCircle },
    error: { bg: 'bg-red-500', icon: AlertTriangle },
  };

  const { bg, icon: Icon } = styleMap[type] || styleMap.success;

  return (
    <div className={`fixed top-5 right-5 z-[100] p-4 rounded-lg shadow-xl flex items-center text-white transition-opacity duration-300 ${bg}`}>
      <Icon className="w-5 h-5 mr-3" />
      <span className="font-medium">{message}</span>
      <button 
        onClick={() => { setIsVisible(false); onClose(); }} 
        className="ml-4 text-white hover:text-gray-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;