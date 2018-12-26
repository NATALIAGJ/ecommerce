const express = require("express");
const router = express.Router();
const ProductsService = require("../../services/products");

const productService = new ProductsService();

router.get("/", async function(req, res, next) {
  const { tags } = req.query;
  try {
    const products = await productService.getProducts({ tags });
    res.status(200).json({
      data: products,
      message: "products listed"
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async function(req, res, next) {
  const { productId } = req.params;
  try {
    const product = await productService.getProduct({ productId });
    res.status(200).json({
      data: product,
      message: "product retrieved"
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async function(req, res, next) {
  const { body: product } = req;
  try {
    const createProduct = await productService.createProduct({ product });
    res.status(200).json({
      data: createProduct,
      message: "product create"
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:productId", async function(req, res, next) {
  const { productId } = req.params;
  const { body: product } = req;
  try {
    const updateProduct = await productService.updateProduct({ productId, product });
    res.status(200).json({
      data: updateProduct,
      message: "product update"
    });
  } catch (err) {
    next(err);
  }
});


router.delete("/:productId", async function(req, res, next) {
  const { productId } = req.params;
  try {
    const deleteProduct = await productService.deleteProduct({ productId });
    res.status(200).json({
      data: deleteProduct,
      message: "product delete"
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
