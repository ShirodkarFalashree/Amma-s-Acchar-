import React, { useState } from 'react';
import axios from 'axios';
import { X, Image, PlusCircle } from 'lucide-react'; 

const API_BASE_URL = "http://localhost:3000";

const InputField = React.memo(({ name, placeholder, type = 'text', step = null, required = false, value, onChange, disabled }) => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value || ''}
      onChange={onChange}
      className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-yellow-500 focus:border-yellow-500 text-gray-800"
      required={required}
      disabled={disabled}
      step={step}
    />
));

// Signature changed to expect onShowToast
const AddAcharModal = ({ onClose, onProductAdded, onShowToast }) => { 
  const [formData, setFormData] = useState({
    name: '', price: '', rating: '', quantity: '', description: '',
    feature1: '', feature2: '', feature3: '',
    faq1Q: '', faq1A: '', faq2Q: '', faq2A: '',
  });
  const [images, setImages] = useState({ image1: null, image2: null });
  const [loading, setLoading] = useState(false);
  
  // Removed message and isError state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setImages(prev => ({ ...prev, [name]: files[0] }));
    } else {
       setImages(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!formData.name || !formData.price || !formData.quantity || !formData.description) {
      onShowToast('Please fill in all core required fields.', 'error'); // Use toast for validation error
      setLoading(false);
      return;
    }
    
    // Both images are required
    if (!images.image1 || !images.image2) {
      onShowToast('Both Image 1 and Image 2 are required.', 'error'); // Use toast for image error
      setLoading(false);
      return;
    }

    const form = new FormData();
    Object.keys(formData).forEach(key => form.append(key, formData[key]));
    form.append('images', images.image1);
    form.append('images', images.image2);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/achar`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        onShowToast('New Achar added successfully!', 'success'); // Use toast for success
        onProductAdded(); 
        onClose(); // Close the modal immediately on success
      } else {
        throw new Error(response.data.message || 'Failed to add product.');
      }
    } catch (error) {
      console.error("Product submission failed:", error);
      onShowToast(`Failed to add Achar: ${error.response?.data?.message || error.message}`, 'error'); // Use toast for API error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose} 
          className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-800"
          disabled={loading}
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold text-[#6B3E26] mb-4 border-b pb-2">
          <PlusCircle className="inline-block mr-2 text-yellow-500" /> Add New Achar Product
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Column 1: Core Details & Images */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-gray-700">Core Product Details</h4>
            <InputField name="name" placeholder="Achar Name (e.g., Mango Pickle)" required value={formData.name} onChange={handleChange} disabled={loading} />
            <InputField name="description" placeholder="Product Description" required value={formData.description} onChange={handleChange} disabled={loading} />
            
            <div className="grid grid-cols-3 gap-3">
                <InputField name="price" placeholder="Price (₹)" type="number" required value={formData.price} onChange={handleChange} disabled={loading} />
                <InputField name="rating" placeholder="Rating (e.g., 4.5)" type="number" step="0.1" value={formData.rating} onChange={handleChange} disabled={loading} />
                <InputField name="quantity" placeholder="Stock Quantity" type="number" required value={formData.quantity} onChange={handleChange} disabled={loading} />
            </div>

            <h4 className="font-semibold text-lg text-gray-700 pt-2">Product Images (Both Required)</h4>
            <div className="grid grid-cols-2 gap-3">
              <label className={`border-2 border-dashed p-4 rounded-lg cursor-pointer flex flex-col items-center justify-center h-28 hover:bg-gray-50 transition-colors duration-200 ${images.image1 ? 'border-green-500' : 'border-gray-300'}`}>
                <Image className={`w-6 h-6 mb-1 ${images.image1 ? 'text-green-500' : 'text-gray-500'}`} />
                <span className="text-sm text-gray-600 truncate w-full text-center">
                  {images.image1 ? images.image1.name : 'Image 1 (Required)'}
                </span>
                <input type="file" name="image1" onChange={handleImageChange} className="hidden" accept="image/*" />
              </label>
              <label className={`border-2 border-dashed p-4 rounded-lg cursor-pointer flex flex-col items-center justify-center h-28 hover:bg-gray-50 transition-colors duration-200 ${images.image2 ? 'border-green-500' : 'border-gray-300'}`}>
                <Image className={`w-6 h-6 mb-1 ${images.image2 ? 'text-green-500' : 'text-gray-500'}`} />
                <span className="text-sm text-gray-600 truncate w-full text-center">
                  {images.image2 ? images.image2.name : 'Image 2 (Required)'}
                </span>
                <input type="file" name="image2" onChange={handleImageChange} className="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          {/* Column 2: Features & FAQs */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-gray-700">Features (Up to 3)</h4>
            <InputField name="feature1" placeholder="Feature 1 (e.g., 100% Homemade)" value={formData.feature1} onChange={handleChange} disabled={loading} />
            <InputField name="feature2" placeholder="Feature 2 (e.g., Authentic Indian Spices)" value={formData.feature2} onChange={handleChange} disabled={loading} />
            <InputField name="feature3" placeholder="Feature 3 (Optional)" value={formData.feature3} onChange={handleChange} disabled={loading} />

            <h4 className="font-semibold text-lg text-gray-700 pt-2">FAQs (Up to 2 Q&A - Both Optional)</h4>
            
            {/* FAQ 1 (Optional) */}
            <div className="border border-gray-200 p-3 rounded-lg space-y-2 bg-gray-50">
              <p className='text-sm font-medium text-gray-600'>FAQ 1</p>
              <InputField name="faq1Q" placeholder="Question 1" value={formData.faq1Q} onChange={handleChange} disabled={loading} />
              <InputField name="faq1A" placeholder="Answer 1" value={formData.faq1A} onChange={handleChange} disabled={loading} />
            </div>
            
            {/* FAQ 2 (Optional) */}
            <div className="border border-gray-200 p-3 rounded-lg space-y-2 bg-gray-50">
              <p className='text-sm font-medium text-gray-600'>FAQ 2</p>
              <InputField name="faq2Q" placeholder="Question 2 (Optional)" value={formData.faq2Q} onChange={handleChange} disabled={loading} />
              <InputField name="faq2A" placeholder="Answer 2 (Optional)" value={formData.faq2A} onChange={handleChange} disabled={loading} />
            </div>
          </div>

          {/* Submission and Message - Removed inline message display */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full mt-5 cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Adding Product...' : 'Add New Achar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAcharModal;