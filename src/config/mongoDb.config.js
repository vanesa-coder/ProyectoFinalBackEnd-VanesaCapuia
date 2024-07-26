import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
      mongoose.connect("mongodb+srv://capuvanesa:vane34@coder70020.tni8iuv.mongodb.net/ecommerce");
      console.log("Mongo DB conectado");
    } catch (error) {
      console.log(error);
    }
  };