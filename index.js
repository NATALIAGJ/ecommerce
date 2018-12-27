const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const boom = require('boom');
const productsApiRouter = require('./routes/api/products');
const authApiRouter = require('./routes/api/auth');

const { 
  logErrors, 
  wrapErrors,
  clientErrorHandler, 
  errorHandler 
} = require('./utils/middlewares/errorsHandlers');

const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');

// App
const app = express();

// Middlewares
app.use(bodyParser.json());

// static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/products', productsApiRouter);
app.use('/api/auth', authApiRouter);

// Redirect
app.get('/', function(req, res) {
  res.redirect('/api/products');
});

app.use(function(req, res, next) {
  if(isRequestAjaxOrApi(req)) {
    const { output: { statusCode, payload } } = boom.notFound();
    res.status(statusCode).json(payload);
  }
  res.status(404).json({ err: 'Page not found'});
});

// Error Handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Server
const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
});
