const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.DB_CONNECTION);
    console.log("database is connected");
  } catch (error) {
    console.log(error);
    throw new Error("Error at init the database");
  }
};

module.exports = {
  dbConnection,
};
