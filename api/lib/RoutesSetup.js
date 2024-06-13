import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js";

export default (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
};
