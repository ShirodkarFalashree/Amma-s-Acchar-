const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// --- New Imports for File Upload ---
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

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

// --- 2. Mongoose Data Models ---

// Schema for Admin credentials
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const Admin = mongoose.model('Admin', AdminSchema);

// Schema for Achar (Pickle) Products
const AcharSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }, // Storing the Cloudinary URL
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
const Achar = mongoose.model('Achar', AcharSchema);

// Schema for Customer Orders
const OrderSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  mobileNumber: { type: String, required: true }, // Key for fetching orders
  email: { type: String },
  acharDetails: { type: AcharSchema, required: true }, // Embeds the details of the ordered achar
  orderDate: { type: Date, default: Date.now },
});
const Order = mongoose.model('Order', OrderSchema);


// --- 3. API Endpoints (Routes) ---

// ** A. Admin Registration/Seeding API (For initial setup only) **
// POST /api/admin
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

// ** B. Admin Login API **
// POST /api/admin/login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username, password });

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }

    // Simple success response (no complex JWT/session handling as requested)
    res.status(200).json({
      success: true,
      message: 'Admin login successful!',
      adminData: {
        id: admin._id,
        username: admin.username,
      },
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during login.', error: error.message });
  }
});

// ** C. Add New Achar API (Admin Function) **
// POST /api/achar
// IMPORTANT: upload.single('image') middleware handles the file
app.post('/api/achar', upload.single('image'), async (req, res) => {
  // Input: name, price, quantity come from req.body (form fields)
  // Input: image comes from req.file (uploaded file)
  const { name, price, quantity } = req.body;
  
  // Check if a file was actually uploaded
  if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image file is required in the "image" field.' });
  }

  try {
    // 1. Convert the file buffer into a Data URI string
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    
    // 2. Upload the Data URI to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(dataURI, {
      folder: 'achar_store', // Optional: creates a dedicated folder in Cloudinary
    });

    const imageUrl = cloudinaryResponse.secure_url; // This is the public URL

    // 3. Save Achar details to MongoDB using the image URL
    const newAchar = new Achar({ 
      name, 
      image: imageUrl, // Store the Cloudinary URL
      price, 
      quantity 
    });
    
    await newAchar.save();

    res.status(201).json({
      success: true,
      message: 'New Achar added successfully! Image uploaded to Cloudinary.',
      achar: newAchar,
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, message: 'Failed to add Achar or upload image.', error: error.message });
  }
});

// ** D. Fetch All Achar Details API **
// GET /api/achar
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

// ** E. Order Achar API (Buy Now) **
// POST /api/order
app.post('/api/order', async (req, res) => {
  const { userName, mobileNumber, email, acharId } = req.body;

  try {
    // 1. Find the specific Achar product details
    const acharToOrder = await Achar.findById(acharId);

    if (!acharToOrder) {
      return res.status(404).json({ success: false, message: 'Achar product not found.' });
    }

    // 2. Create the new order record
    const newOrder = new Order({
      userName,
      mobileNumber,
      email,
      acharDetails: acharToOrder, // Embed the full achar object
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Achar successfully ordered!',
      userDetails: { userName, mobileNumber, email },
      orderedAchar: acharToOrder,
      orderId: newOrder._id,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to place order.', error: error.message });
  }
});

// ** F. Fetch User Orders by Mobile Number API **
// GET /api/orders/:mobileNumber
app.get('/api/orders/:mobileNumber', async (req, res) => {
  const { mobileNumber } = req.params;

  try {
    // Find all orders associated with the mobile number
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

app.get('/api/admin/orders', async (req, res) => {
    try {
      // Fetch all orders from the database, sorted by date (newest first)
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


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));