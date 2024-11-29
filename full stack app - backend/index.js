const express = require("express");
const connect = require("./config/db");

const app = express();

app.listen(1234, async () => {
  await connect();
  console.log("Server is up and running on port 1234");
});
