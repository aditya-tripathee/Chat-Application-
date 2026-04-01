// user register , login , logout

import { User } from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields required!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password don't matched" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists, try others " });
    }

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // profile photo
    const profilePhoto = `https://robohash.org/${username}.png`;

    await User.create({
      fullName,
      username,
      password: hashedPassword,
      profilePhoto: profilePhoto,
      gender,
    });

    return res
      .status(201)
      .json({ message: "User resgiter successfully", success: true });
  } catch (error) {
    console.error("Register error ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Incorrect credentials" });
    }
    // password compared with hashed password
    const isMatchedPassword = await bcrypt.compare(password, user.password);
    if (!isMatchedPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3d",
    });

    // store in cookies
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Login successfully",
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "User logout successfully!" });
  } catch (error) {
    console.error("Logout error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
