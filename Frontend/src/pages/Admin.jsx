import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Loader, LogOut, Package, Trash2, CheckCircle } from 'lucide-react'; 
import AddAcharModal from '../components/AddAcharModal';
import DeleteConfirmModal from '../components/DeleteOrderModal';

const API_BASE_URL = "http://localhost:3000";

const Admin = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // NEW STATE: For delete confirmation dialog
  const [showConfirmDelete, setShowConfirmDelete] = useState(null); // null or { orderId, userName }

  // --- Utility for showing non-blocking success/error messages ---
  const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });
  
  const showStatus = (message, type = 'success') => {
      setStatusMessage({ message, type });
      setTimeout(() => setStatusMessage({ message: '', type: '' }), 4000);
  };

  // Check authentication status on mount
  useEffect(() => {
    const adminId = localStorage.getItem('adminId');
    if (!adminId) {
      navigate('/');
      showStatus("Unauthorized access. Please log in as Admin.", 'error');
    } else {
      fetchOrders();
    }
  }, [navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/orders`);
      const sortedOrders = response.data.orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      setOrders(sortedOrders);
    } catch (err) {
      console.error("Failed to fetch all orders:", err);
      setError('Failed to fetch orders. Check backend connection.');
      if (err.response && err.response.status === 401) { 
         localStorage.removeItem('adminId');
         navigate('/');
         showStatus("Session expired or unauthorized. Please log in again.", 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  // NEW: Function to initiate the delete process (opens the custom dialog)
  const initiateDelete = (orderId, userName) => {
    setShowConfirmDelete({ orderId, userName });
  };
  
  // UPDATED: Function that executes the DELETE API call
  const handleDeleteOrder = async (orderId, userName) => {
    setShowConfirmDelete(null); // Close the dialog
    
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/api/order/${orderId}`);
      
      // Update the state immediately by filtering out the deleted order
      setOrders(orders.filter(order => order._id !== orderId));
      showStatus(`Order for ${userName} marked as complete and deleted!`, 'success');

    } catch (err) {
      console.error("Failed to delete order:", err);
      showStatus('Failed to delete order. Check if the delete API is implemented correctly.', 'error');
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('adminId');
    navigate('/');
  };

  // --- Rendering Logic (Themed) ---

  if (loading && !error) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8E7]">
        <Loader className="animate-spin text-[#6B3E26] w-8 h-8" />
        <span className="ml-2 text-gray-600">Loading Admin Dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-10 text-center text-red-600 bg-[#FFF8E7]">
        Error: {error}
      </div>
    );
  }
  
  if (!localStorage.getItem('adminId')) return null;

  return (
    <div className="min-h-screen bg-[#FFF8E7] p-6 lg:p-10">
      
      {/* Status Message Display */}
      {statusMessage.message && (
        <div className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg flex items-center ${statusMessage.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          <CheckCircle className="w-5 h-5 mr-2" />
          <span>{statusMessage.message}</span>
        </div>
      )}

      {/* Header and Actions */}
      <div className="flex flex-col gap-6 md:flex-row md:gap-0 justify-between items-center border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-[#6B3E26]">Admin Dashboard</h1>
        <div className="space-x-4 flex items-center">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition"
            disabled={loading}
          >
            <Plus className="w-5 h-5 mr-2" /> Add New Achar
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-600 hover:bg-gray-700 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg flex items-center transition"
            disabled={loading}
          >
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Order List */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        All Customer Orders ({orders.length})
      </h2>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order._id.substring(18)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.mobileNumber} <br/> {order.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.acharDetails.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-1 last:mb-0">
                        <Package size={14} className="text-[#6B3E26]" />
                        <span className='font-semibold'>{item.name}</span>
                        <span className='text-gray-600'>({item.selectedQuantity} Jars)</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-700">
                    ₹{order.acharDetails.reduce((total, item) => total + (item.priceAtOrder * item.selectedQuantity), 0)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.orderDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => initiateDelete(order._id, order.userName)} // 👈 Call initiate function
                      className="text-red-600 cursor-pointer hover:text-red-900 bg-red-100 p-2 rounded-full transition-colors duration-200"
                      title="Mark as Completed & Delete"
                      disabled={loading}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && (
            <p className="text-center py-8 text-gray-500">No orders have been placed yet.</p>
        )}
      </div>

      {/* Add Achar Modal Component */}
      {showAddModal && (
        <AddAcharModal 
          onClose={() => setShowAddModal(false)} 
          onProductAdded={fetchOrders}
        />
      )}
      
      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <DeleteConfirmModal 
            orderDetails={showConfirmDelete}
            onConfirm={handleDeleteOrder}
            onCancel={() => setShowConfirmDelete(null)}
        />
      )}
    </div>
  );
};

export default Admin;