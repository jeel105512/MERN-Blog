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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(401, "Could not find the user!"));
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      return next(errorHandler(401, "Incorrect Password!"));
    }

    const payload = {
      id: user._id,
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

export const varifyJWTToken = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoURL } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      // user exists, signin
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      const { password, ...userInfo } = user._doc;

      res.status(200).json({
        success: true,
        status: 200,
        message: "Login Successful",
        token: `Bearer ${token}`,
        user: userInfo,
      });
    } else {
      // user does not exist, signup
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        name:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePitcure: googlePhotoURL,
      });

      await newUser.save();

      const payload = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      const { passwort, ...userInfo } = newUser._doc;

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Signup Successful",
        token: `Bearer ${token}`,
        user: userInfo,
      });
    }
  } catch (error) {
    next(error);
  }
};
