const express = require("express");
const Product = require("../schema/product");

const router = express.Router();

//Create new Product
router.post("/", async (req, res) => {
  const { name, price, category } = req.body;

  try {
    const newProduct = new Product({ name, price, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: `Error creating product`, error });
  }
});

//Read all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: `Error fetching products`, error });
  }
});

//update product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: `Error updating product`, error });
  }
});

//Delete product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

module.exports = router;
