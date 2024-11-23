import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { User } from "../models/userModel.js";

// JWT configuration
const JWT_SECRET = "your-secret-key";
const JWT_REFRESH_SECRET = "your-refresh-secret-key";

// Login endpoint
export const login = async (req, res) => {
  const requestId = uuidv4();
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        requestId,
        data: null,
        message: "Invalid email or password",
        success: false,
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        requestId,
        data: null,
        message: "Invalid email or password",
        success: false,
      });
    }

    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    res.json({
      requestId,
      data: {
        accessToken,
        refreshToken,
        expiredIn: 3600,
        user: userData,
      },
      message: "Login successful",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      requestId,
      data: null,
      message: "Internal server error",
      success: false,
    });
  }
};

// Register endpoint
export const register = async (req, res) => {
  const requestId = uuidv4();
  try {
    const { email, password, name, phoneNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        requestId,
        data: null,
        message: "Email already registered",
        success: false,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      phoneNumber,
    });

    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
    };

    res.status(201).json({
      requestId,
      data: userData,
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      requestId,
      data: null,
      message: "Internal server error",
      success: false,
    });
  }
};
