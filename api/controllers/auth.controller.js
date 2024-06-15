import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import passport from "passport";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json({
      success: true,
      status: 200,
      message: "Signup Successful",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(errorHandler(401, "Could not find the user!"));
    }

    if (!bcryptjs.compareSync(req.body.password, user.password)) {
      return next(errorHandler(401, "Incorrect Password!"));
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Login Successful",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    next(error);
  }
};

export const varifyJWTToken = passport.authenticate("jwt", {session: false});