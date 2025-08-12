const dotenv=require("dotenv")
dotenv.config();
const connectDb=require("./config/db.js");
connectDb();
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const quizRoutes = require("./routes/quizRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/quizzes", quizRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
  console.log(`server is running on port ${PORT}`)
);