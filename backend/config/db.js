import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Loshop';

const connectedDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUrl);
    console.log('mongoose connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectedDB;
