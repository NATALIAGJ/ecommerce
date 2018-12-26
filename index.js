const express = require("express");
const bodyParser = require('body-parser');

const productsApiRouter = require('./routes/api/products');

const app = express();

app.use("/api/products", productsApiRouter);

app.use(bodyParser.json());

const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
});
