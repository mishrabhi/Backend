const express = require("express");
const connect = require("./config/db");
const app = express();
const eventRoute = require("./routes/eventRoutes");

const PORT = 3000;
app.use(express.json());

//Routes
app.use("/", eventRoute);

app.listen(PORT, async () => {
  connect();
  console.log(`Server is up and running on port: ${PORT}`);
});
