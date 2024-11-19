const express = require("express");
const Product = require("../schema/product.model");

const router = express.Router();

//Add new product
router.post("/", async (req, res) => {
  const { productName, price, category, stock, SKU, tags } = req.body;
  try {
    const newProduct = new Product({
      productName,
      price,
      category,
      stock,
      SKU,
      tags,
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
    res.status(500).json({ message: "Error fetching products", error });
  }
});

//Update product
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
    res.json({ message: `Product deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: `Error deleting products` });
  }
});

module.exports = router;
