const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      require: true,
      maxLength: [50, "Product name cannot exceed 50 characters"],
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0.01, "Price must be an positive integer value"],
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: ["Electronics", "Clothing", "Books", "Home Appliances"],
        message: "{VALUE} is not a valid category",
      },
    },
    stock: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "Stock must be an integer",
      },
    },
    SKU: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          const parts = value.split("-");
          return (
            parts.length === 2 && parts[0] === "PROD" && parts[1].length === 4
          );
        },
        message:
          "SKU must follow the pattern PROD-XXXX where XXXX is numeric value",
      },
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
