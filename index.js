require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB (use Railway-provided MONGO_URL in production)
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/men_clothing_emporium', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define product schema
const productSchema = new mongoose.Schema({
  category: String,
  name: String,
  price: Number
});

const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine to EJS
app.set('view engine', 'ejs');

// GET route to display form and products
app.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('index', { products });
});

// POST route to add product
app.post('/add-product', async (req, res) => {
  const { category, name, price } = req.body;
  const product = new Product({ category, name, price });
  await product.save();
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
