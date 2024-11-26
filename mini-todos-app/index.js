const express = require("express");
const connect = require("./config/db");

const app = express();

const PORT = 3000;

app.listen(PORT, async () => {
  await connect();
  console.log(`Server is up and running ${PORT}`);
});
