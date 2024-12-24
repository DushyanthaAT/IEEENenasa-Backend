import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

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

app.get("/test-db", async (req, res) => {
  try {
    // Example of interacting with the database
    const databases = await mongoose.connection.db.admin().listDatabases();
    res
      .status(200)
      .json({ message: "Database connection is working!", databases });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error testing the database connection.", error });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
