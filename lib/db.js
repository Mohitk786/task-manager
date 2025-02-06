import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI || "mongodb+srv://kumarmohit08004:tdor0421@cluster0.tbbon.mongodb.net/task-manager";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}