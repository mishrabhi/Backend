const express = require("express");
const connect = require("./config/db");
const productRoutes = require("./routes/product.routes");

const app = express();
const PORT = 3000;

//Middleware to parse JSON
app.use(express.json());

//Routes
app.use("/product", productRoutes);

app.listen(PORT, async () => {
  await connect();
  console.log(`Server is up and running on port: ${PORT}`);
});
