require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes"); // 🔥 add this
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// middleware
app.use(cors({
  origin: "https://frontend-client-khaki.vercel.app",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database
console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

// routes
app.use("/api/auth", authRoutes);     // 🔐 login/register/profile
app.use("/api/students", studentRoutes); // 📦 CRUD
app.use("/api/todos", todoRoutes);

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});