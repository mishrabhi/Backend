const express = require("express");
const connect = require("./config/db");
const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");

const app = express();
const PORT = 3000;

//Middleware to parse JSON
app.use(express.json());

//Routes handling
app.use("/users", userRoutes);
app.use("/products", productRoutes);

//Server
app.listen(PORT, async () => {
  await connect(); //MongoDb connect function
  console.log(`Server up and running on port: ${PORT}`);
});
