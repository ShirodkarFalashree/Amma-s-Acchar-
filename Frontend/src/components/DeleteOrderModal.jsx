import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const DeleteConfirmModal = ({ orderDetails, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-sm relative">
        <button 
          onClick={onCancel} 
          className="absolute top-3 right-3 text-gray-400 cursor-pointer hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Order Completion</h3>
          <p className="text-sm text-gray-600">
            Mark order for <span className="font-semibold text-[#6B3E26]">{orderDetails.userName}</span> as COMPLETED and permanently delete it?
          </p>
          <p className="text-xs text-red-500 mt-1">This action cannot be undone.</p>
        </div>

        <div className="flex justify-between space-x-3 mt-5 cursor-pointer">
          <button
            onClick={onCancel}
            className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(orderDetails.orderId, orderDetails.userName)}
            className="w-1/2 bg-red-600 hover:bg-red-700 cursor-pointer text-white font-semibold py-2 rounded-lg transition"
          >
            Delete Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;