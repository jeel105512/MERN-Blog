import express from "express";

import {
  signup,
  signin,
  varifyJWTToken,
  google,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/varify-JWT-Token", varifyJWTToken, (req, res) => {
  res.json({
    success: true,
    status: 200,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/google", google);

export default router;
