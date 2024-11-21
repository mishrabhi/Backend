const express = require("express");
const Category = require("../schema/category.model");

const router = express.Router();

//Add new category
router.post("/add", async (req, res) => {
  const { name, description, productIds } = req.body;
  try {
    const newCategory = new Category({
      name,
      description,
      products: productIds,
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: `Eror adding new category` });
  }
});

//Read All categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().populate("products");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Read single category
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "products"
    );
    if (!category)
      return res.status(400).json({ message: `Category not found` });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Update Category
router.put("/:id", async (req, res) => {
  try {
    const { name, description, products } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, products },
      { new: true }
    );
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Delete Category
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
