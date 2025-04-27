import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
    // Set the connection to use the new URL parser and unified topology
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
export default connectDB;
