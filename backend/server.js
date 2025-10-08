const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

// --- API Routes ---
app.get('/', (req, res) => res.send('OvaUnmute API Running'));
// This tells the server to use the routes we created in auth.js
// for any path that starts with /api/auth
app.use('/api/auth', require('./routes/auth'));

// --- Start Server ---
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));