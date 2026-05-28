import mongoose from "mongoose";

const MAX_RETRIES = 5;
let retries = 0;

export const connectDB = async () => {
  try {
    let uri = "mongodb://localhost:27017/resultMunch";
    const conn = await mongoose.connect(uri, {
      dbName: "resultMunch",
      autoIndex: false, // ❗ disable in production
      serverSelectionTimeoutMS: 5000, // fail fast
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Event listeners (IMPORTANT)
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);

    if (retries < MAX_RETRIES) {
      retries++;
      console.log(`🔁 Retrying... (${retries}/${MAX_RETRIES})`);
      setTimeout(connectDB, 5000);
    } else {
      console.error("❌ Max retries reached. Exiting...");
      process.exit(1);
    }
  }
};
