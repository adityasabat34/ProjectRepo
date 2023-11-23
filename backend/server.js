const epxress = require('express');
const products = require('./data/products');
const dotenv = require('dotenv');

dotenv.config();

const app = epxress();

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server running on port 5000');
});
