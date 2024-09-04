const mongoose = require('mongoose');
require('dotenv').config();

const DbConnection = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }

    await mongoose.connect(mongoUri);

    console.log("Database Connection is Successful");
  } catch (error) {
    console.error("Connection error occurred:", error);
    throw error; // Rethrow the error to be caught in CheckDBConnection
  }
};

module.exports = DbConnection;
