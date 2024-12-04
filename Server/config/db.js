import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/M-eCommerce`);
    console.log("mongodb connected to ", conn.connection.host);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
