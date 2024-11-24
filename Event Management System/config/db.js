const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/event-management";

const connect = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDb connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
