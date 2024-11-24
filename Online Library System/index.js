const express = require("express");
const bodyParser = require("body-parser");
const connect = require("./config/db");

const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
app.use(bodyParser.json());
const PORT = 5000;

//Routes
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("transactions", transactionRoutes);

app.listen(PORT, async () => {
  await connect();
  console.log(`Server is up and running at port: ${PORT}`);
});
