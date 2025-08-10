const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/urlshortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// URL Schema
const urlSchema = new mongoose.Schema({
  original_url: { type: String, required: true },
  short_code: { type: String, required: true, unique: true },
  visit_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

const Url = mongoose.model('Url', urlSchema);

// Generate random short code
function generateShortCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Routes
app.post('/api/shorten', async (req, res) => {
  try {
    const { original_url } = req.body;
    
    if (!original_url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const short_code = generateShortCode();
    const newUrl = new Url({ original_url, short_code });
    await newUrl.save();

    res.json({
      original_url,
      short_url: `http://localhost:${PORT}/${short_code}`,
      short_code
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/:shortCode', async (req, res) => {
  try {
    const url = await Url.findOne({ short_code: req.params.shortCode });
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Increment visit count
    url.visit_count += 1;
    await url.save();

    res.redirect(url.original_url);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/urls', async (req, res) => {
  try {
    const urls = await Url.find().sort({ created_at: -1 });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
