import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routing.js";
import { connectDB } from "./src/config/mongo.init.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/api/v1", router);

function startServer() {}

app.listen(PORT, () => {
  try {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Error starting the server:", error);
  }
});
