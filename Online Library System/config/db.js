const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/online-library";

const connect = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
