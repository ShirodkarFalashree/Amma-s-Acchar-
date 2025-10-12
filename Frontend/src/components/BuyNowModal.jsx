import React, { useState } from 'react';
import axios from 'axios'; // We'll use axios for cleaner API calls
import { X } from 'lucide-react'; // Icon library (assuming you have it or use simple text)

// Define your base API URL
const API_BASE_URL = "http://localhost:3000";

const BuyNowModal = ({ product, selectedQuantity, onClose }) => {
  const [formData, setFormData] = useState({
    userName: '',
    mobileNumber: '',
    email: '',
    acharId: product._id,
    selectedQuantity: selectedQuantity,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Handle input changes (user details)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle quantity change from the dropdown in the modal (if the user changes their mind)
  const handleQuantityChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedQuantity: parseInt(e.target.value),
    }));
  };

  // Handle form submission and API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setIsError(false);

    // Basic validation
    if (!formData.userName || !formData.mobileNumber || !formData.acharId || !formData.selectedQuantity) {
        setMessage('Please fill in all required fields.');
        setIsError(true);
        setIsSubmitting(false);
        return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/order`, formData);

      if (response.data.success) {
        setMessage('🎉 Order placed successfully! Thank you for your purchase.');
        // Optionally, close the modal after a short delay
        setTimeout(onClose, 3000); 
      } else {
        throw new Error(response.data.message || 'Failed to place order.');
      }
    } catch (error) {
      console.error("Order submission failed:", error);
      setMessage(`❌ Error placing order: ${error.response?.data?.message || error.message}`);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate quantity options (1 up to a reasonable limit, capped by stock)
  const maxOrderQuantity = 10; // Max number user can select in one order
  const availableStock = product.quantity;
  const quantityOptions = [];
  const limit = Math.min(maxOrderQuantity, availableStock);
  for (let i = 1; i <= limit; i++) {
    quantityOptions.push(i);
  }

  return (
    // Modal Backdrop
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-2xl p-6 w-11/12 max-w-lg relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold text-[#6B3E26] mb-4 border-b pb-2">
          Place Order: {product.name}
        </h3>

        <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg border">
            <span className="font-semibold text-gray-700">Price: ₹{product.price}</span>
            <span className="font-semibold text-gray-700">Total: ₹{product.price * formData.selectedQuantity}</span>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Quantity Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Quantity (Jars)</label>
            <select 
              name="selectedQuantity"
              value={formData.selectedQuantity}
              onChange={handleQuantityChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-yellow-500 focus:border-yellow-500"
              required
              disabled={isSubmitting}
            >
              {quantityOptions.map((q) => (
                <option key={q} value={q}>
                  {q} {q === 1 ? 'Jar' : 'Jars'} (Total Stock: {availableStock})
                </option>
              ))}
            </select>
          </div>

          {/* User Details */}
          <div className="space-y-3">
            <input
              type="text"
              name="userName"
              placeholder="Your Full Name (Required)"
              value={formData.userName}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              required
              disabled={isSubmitting}
            />
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Mobile Number (Required)"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              required
              disabled={isSubmitting}
            />
            <input
              type="email"
              name="email"
              placeholder="Email (Optional)"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              disabled={isSubmitting}
            />
          </div>

          {/* Message Area */}
          {message && (
            <p className={`mt-4 text-center p-2 rounded ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-5 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing Order...' : `CONFIRM BUY NOW (₹${product.price * formData.selectedQuantity})`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyNowModal;