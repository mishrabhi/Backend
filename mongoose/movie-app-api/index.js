const express = require("express");
const connect = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");

const app = express();
PORT = 3000;

//Middleware to parse json
app.use(express.json());

//Routes Handling
app.use("/movies", movieRoutes);

//Server
app.listen(PORT, async () => {
  await connect(); //DB connect function
  console.log(`Server is up and running on port: ${PORT}`);
});
