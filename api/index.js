import express from "express";
import MongooseSetup from "./lib/MongooseSetup.js";

import userRoutes from "./routes/user.route.js";

const app = express();

MongooseSetup();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRoutes);