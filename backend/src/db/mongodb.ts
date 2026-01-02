import mongoose from "mongoose";



export const connectToMongoDB = async (mongoURI: string) => {
  try {
    const connectesInstance = await mongoose.connect(mongoURI);
    console.log(`Connected to MongoDB successfully. Host at ${connectesInstance.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  } 
};