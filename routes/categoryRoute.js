/*const express = require("express");
const categoryRoute = express.Router();
const categoryControl = require("../Controller/categoryController");

categoryRoute.post("/", categoryControl.createCategory);
categoryRoute.get("/", categoryControl.getCategories);
categoryRoute.get("/:id", categoryControl.getCategoryById);
categoryRoute.delete("/:id", categoryControl.deleteCategory);

module.exports = categoryRoute;*/














const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../Controller/categoryController");

const router = express.Router();

// Routes for categories
router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById) ;
router.put("/:id", updateCategory); // ✅ تم التصحيح هنا من router.update إلى router.put
router.delete("/:id", deleteCategory);

module.exports = router;
