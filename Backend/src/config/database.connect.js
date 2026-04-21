import mongoose from "mongoose";
import { config } from "./config.js";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

export async function connectToDatabase() {
  try {
    await mongoose
      .connect(config.MONGO_URI)
      .then(() => {
        console.log("Connected to Database...");
      })
      .catch((error) => {
        console.error("Error connecting to Database:", error);
      });
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}


