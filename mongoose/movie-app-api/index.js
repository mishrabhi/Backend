const express = require("express");
const connect = require("./config/db");

const app = express();
PORT = 3000;

//Server
app.listen(PORT, async () => {
  await connect(); //DB connect function
  console.log(`Server is up and running on port: ${PORT}`);
});
