/*const express = require("express");
const productRoute = express.Router();
const productControl = require("../Controller/productController");

productRoute.post("/", productControl.createProduct);
productRoute.get("/", productControl.getProducts);
productRoute.get("/:id", productControl.getProductById);
productRoute.delete("/:id", productControl.deleteProduct);
productRoute.patch("/:id", productControl.updateProduct);

module.exports = productRoute;*/















const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../Controller/productController");

const router = express.Router();

// Routes for products
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
