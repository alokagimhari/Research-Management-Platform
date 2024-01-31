const mongoose = require ("mongoose");
const colors = require ("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/RMPM", {
      useNewUrlParser: true,
      family:4
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

module.exports= connectDB;