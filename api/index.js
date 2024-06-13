import express from "express";
import MongooseSetup from "./lib/MongooseSetup.js";

const app = express();

MongooseSetup();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});