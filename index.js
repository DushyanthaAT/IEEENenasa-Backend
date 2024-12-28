import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import cors from "cors";

dotenv.config();
const port = 5002;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/test-db", async (req, res) => {
  try {
    res.status(200).json({ message: "Database connection is working!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error testing the database connection.", error });
  }
});

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
