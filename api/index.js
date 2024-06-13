import express from "express";
import MongooseSetup from "./lib/MongooseSetup.js";
import RoutesSetup from "./lib/RoutesSetup.js";

const app = express();

app.use(express.json());

MongooseSetup();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

RoutesSetup(app);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
});
