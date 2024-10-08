import mongoose from "mongoose";
require("dotenv").config();

const dbUrl: string = "mongodb://localhost:27017/LMS";

export const connectDb = async () => {
  try {
    await mongoose
      .connect(dbUrl)
      .then((data: any) =>
        console.log(`Database connected with ${data.connection.host}`)
      );
  } catch (error:any) {
    console.log(error.message);
    setTimeout(connectDb, 5000);
  }
};