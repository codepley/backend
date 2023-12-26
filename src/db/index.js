import mongoose, { mongo } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async function() {
   try {
      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
      console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
   } catch (error) {
      console.log("MONGODB Err: ", error);
      process.exit(1) // read about process in nodejs
   }
}

export default connectDB;