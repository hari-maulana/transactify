import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { User } from "../models/userModel.js";

// JWT configuration
const JWT_SECRET = "your-secret-key";
const JWT_REFRESH_SECRET = "your-refresh-secret-key";

export const createProduct = async (req, res) => {
  const requestId = uuidv4();
  try {
    const { productName, date, productCode, price, quantity } = req.body;

    // Ensure the product name is unique for the user
    const existingProduct = await Product.findOne({
      where: { productName, userId: req.user.userId },
    });

    if (existingProduct) {
      return res.status(400).json({
        requestId,
        data: null,
        message: "Product name already exists",
        success: false,
      });
    }

    // Create the product
    const product = await Product.create({
      productName,
      date,
      productCode,
      price,
      quantity,
      userId: req.user.userId,
    });

    res.status(201).json({
      requestId,
      data: product,
      message: "Product created successfully",
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

// Get products endpoint
export const getProducts = async (req, res) => {
  const requestId = uuidv4();
  try {
    // Fetch only the products created by the logged-in user
    const products = await Product.findAll({
      where: { userId: req.user.userId },
    });

    res.json({
      requestId,
      data: products,
      message: "Products fetched successfully",
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
