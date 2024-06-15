import express, { urlencoded } from "express";
import MongooseSetup from "./lib/MongooseSetup.js";
import RoutesSetup from "./lib/RoutesSetup.js";
import PassportSetup from "./lib/PassportSetup.js";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

MongooseSetup();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

RoutesSetup(app);

PassportSetup(app);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
});
