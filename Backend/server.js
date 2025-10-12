const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// --- New Imports for File Upload ---
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const cors = require('cors'); 

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// --- CORS Middleware Configuration (Allow All Origins) ---
app.use(cors()); 

// --- Cloudinary Configuration ---
// These credentials must be set in your .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- Multer Configuration ---
// We use memory storage to keep the file in buffer format temporarily
// before sending it directly to Cloudinary.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// --- 1. Database Connection ---

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process if connection fails
  }
};

connectDB();

// --- 2. Mongoose Data Models (REVISED Achar Schema) ---

// Schema for Admin credentials
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const Admin = mongoose.model('Admin', AdminSchema);

// --- REVISED: Schema for Achar (Pickle) Products ---
const AcharSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  
  // New Fields for Rich Product Data
  rating: { type: Number, default: 0 }, 
  // Simplified: Storing quantity as a single number (e.g., number of units/jars available)
  quantity: { type: Number, required: true }, 
  images: { type: [String], default: [] },      
  description: { type: String }, 
  features: { type: [String], default: [] }, // Array of strings
  faqs: { 
    type: [{ q: String, a: String }], // Array of objects with question and answer
    default: []
  },
});
const Achar = mongoose.model('Achar', AcharSchema);

// --- Order Schemas (NO CHANGE) ---
const OrderItemSchema = new mongoose.Schema({
    acharId: { type: mongoose.Schema.Types.ObjectId, ref: 'Achar', required: true }, 
    name: { type: String, required: true },
    priceAtOrder: { type: Number, required: true }, 
    selectedQuantity: { type: Number, required: true }, 
    imageUrl: { type: String }, 
}, { _id: false }); 

const OrderSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  mobileNumber: { type: String, required: true }, 
  email: { type: String },
  acharDetails: { type: [OrderItemSchema], required: true }, 
  orderDate: { type: Date, default: Date.now },
});
const Order = mongoose.model('Order', OrderSchema);


// --- 3. API Endpoints (Routes) ---

// ** A. Admin Registration/Seeding API (NO CHANGE) **
app.post('/api/admin', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(409).json({ success: false, message: 'Admin with this username already exists.' });
    }
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.status(201).json({
      success: true,
      message: 'Admin credentials added successfully (Use for initial setup only).',
      admin: { id: newAdmin._id, username: newAdmin.username },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while adding admin.', error: error.message });
  }
});

// ** B. Admin Login API (NO CHANGE) **
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username, password });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }
    res.status(200).json({
      success: true,
      message: 'Admin login successful!',
      adminData: { id: admin._id, username: admin.username },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during login.', error: error.message });
  }
});

// ** C. Add New Achar API (Admin Function - REWRITTEN FOR SIMPLE FIELDS) **
// POST /api/achar
app.post('/api/achar', upload.array('images', 2), async (req, res) => {
  const { 
    name, 
    price, 
    rating, 
    quantity, // Simple number
    description,
    // Individual Feature Fields (Expecting up to 3)
    feature1, 
    feature2, 
    feature3,
    // Individual FAQ Fields (Expecting up to 3 Q&A pairs)
    faq1Q, faq1A, 
    faq2Q, faq2A, 
    faq3Q, faq3A,
  } = req.body;
  
  if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one image file is required in the "images" field (max 2 accepted).' });
  }

  try {
    // 1. Build Features Array
    const featuresArray = [feature1, feature2, feature3].filter(f => f && f.trim() !== '');

    // 2. Build FAQs Array
    const faqsArray = [];
    if (faq1Q && faq1A) faqsArray.push({ q: faq1Q, a: faq1A });
    if (faq2Q && faq2A) faqsArray.push({ q: faq2Q, a: faq2A });
    if (faq3Q && faq3A) faqsArray.push({ q: faq3Q, a: faq3A });
    
    // 3. Upload files to Cloudinary
    const uploadPromises = req.files.map(file => {
        const b64 = Buffer.from(file.buffer).toString("base64");
        let dataURI = "data:" + file.mimetype + ";base64," + b64;
        return cloudinary.uploader.upload(dataURI, { folder: 'achar_store' });
    });

    const cloudinaryResponses = await Promise.all(uploadPromises);
    const imageUrls = cloudinaryResponses.map(response => response.secure_url);

    // 4. Save Achar details to MongoDB
    const newAchar = new Achar({ 
      name, 
      price: parseFloat(price), 
      rating: parseFloat(rating),
      quantity: parseInt(quantity), // Ensure quantity is an integer
      images: imageUrls,         
      description,
      features: featuresArray,  // Save the constructed array
      faqs: faqsArray           // Save the constructed array
    });
    
    await newAchar.save();

    res.status(201).json({
      success: true,
      message: 'New Achar added successfully!',
      achar: newAchar,
    });
  } catch (error) {
    console.error('Upload/Save Error:', error);
    res.status(500).json({ 
        success: false, 
        message: 'Failed to add Achar or upload image. Check that price, rating, and quantity are valid numbers.', 
        error: error.message 
    });
  }
});

// ** D. Fetch All Achar Details API (NO CHANGE) **
app.get('/api/achar', async (req, res) => {
  try {
    const allAchar = await Achar.find({});
    res.status(200).json({
      success: true,
      message: 'Successfully fetched all Achar products.',
      acharList: allAchar,
      count: allAchar.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch Achar list.', error: error.message });
  }
});

// ** E. Order Achar API (NO CHANGE) **
app.post('/api/order', async (req, res) => {
  const { userName, mobileNumber, email, acharId, selectedQuantity } = req.body; 
  try {
    const acharToOrder = await Achar.findById(acharId);
    if (!acharToOrder) {
      return res.status(404).json({ success: false, message: 'Achar product not found.' });
    }
    const orderItem = {
        acharId: acharToOrder._id,
        name: acharToOrder.name,
        priceAtOrder: acharToOrder.price,
        selectedQuantity: selectedQuantity || acharToOrder.quantity, // Now compares against single number
        imageUrl: acharToOrder.images.length > 0 ? acharToOrder.images[0] : null,
    };
    const newOrder = new Order({
      userName, mobileNumber, email, acharDetails: [orderItem], 
    });
    await newOrder.save();
    res.status(201).json({
      success: true,
      message: 'Achar successfully ordered!',
      userDetails: { userName, mobileNumber, email },
      orderedItem: orderItem,
      orderId: newOrder._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to place order.', error: error.message });
  }
});

// ** F. Fetch User Orders by Mobile Number API (NO CHANGE) **
app.get('/api/orders/:mobileNumber', async (req, res) => {
  const { mobileNumber } = req.params;
  try {
    const userOrders = await Order.find({ mobileNumber });
    if (userOrders.length === 0) {
      return res.status(404).json({ success: false, message: `No orders found for mobile number ${mobileNumber}.` });
    }
    res.status(200).json({
      success: true,
      message: `Successfully fetched ${userOrders.length} orders for ${mobileNumber}.`,
      orders: userOrders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while fetching orders.', error: error.message });
  }
});

// ** G. Fetch All Orders for Admin (NO CHANGE) **
app.get('/api/admin/orders', async (req, res) => {
    try {
      const allOrders = await Order.find({}).sort({ orderDate: -1 });
      res.status(200).json({
        success: true,
        message: `Successfully fetched a total of ${allOrders.length} orders.`,
        totalOrders: allOrders.length,
        orders: allOrders,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch all orders.', error: error.message });
    }
  });

  app.delete('/api/order/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedOrder = await Order.findByIdAndDelete(id);
  
      if (!deletedOrder) {
        return res.status(404).json({ success: false, message: 'Order not found.' });
      }
  
      res.status(200).json({
        success: true,
        message: 'Order successfully deleted/completed.',
        orderId: id,
      });
  
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error while deleting order.', error: error.message });
    }
  });


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));