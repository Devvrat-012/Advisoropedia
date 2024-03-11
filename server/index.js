import express from "express";
import authRouter from "./routes/auth.route.js";
import mongoose from "mongoose";
import cors from 'cors';
import postRouter from "./routes/post.route.js";

const app = express();
const port = 3000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors({
  credentials:true,
  origin:"http://localhost:5173"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Everything is Okay!");
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.use(express.json());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`Server ${port} is running!`);
});
