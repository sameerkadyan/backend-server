require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const studentRoutes = require("./src/routes/studentRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// debug
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend running",
  });
});

// database
console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});