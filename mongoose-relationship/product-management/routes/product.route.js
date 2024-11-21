const express = require("express");
const Product = require("../schema/product.model");

const router = express.Router();

//Add new product
router.post("/add", async (req, res) => {
  const { name, price, category, stock } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      category,
      stock,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: `Error adding new product`, error });
  }
});

//Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: `Error fetching products`, error });
  }
});

//Get a single Product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: `Error fetching single product`, error });
  }
});

//Update Product
router.put("/:id", async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, stock },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: `Product not found` });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
