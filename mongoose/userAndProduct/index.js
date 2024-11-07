const express = require("express");
const connect = require("./config/db");

const app = express();

const PORT = 3000;
app.listen(PORT, async () => {
  await connect();
  console.log(`Server up and running on port: ${PORT}`);
});