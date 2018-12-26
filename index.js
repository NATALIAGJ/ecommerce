const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const productsApiRouter = require('./routes/api/products');

// App
const app = express();

// Middlewares
app.use(bodyParser.json());

// static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/products', productsApiRouter);

// Redirect
app.get('/', function(req, res) {
  res.redirect('/api/products');
});

// Server
const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
});
