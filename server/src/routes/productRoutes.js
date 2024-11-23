import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";

export const productRouter = express.Router();

// Create product endpoint
productRouter.post("/products", authenticateToken, createProduct);

// Get products endpoint
productRouter.get("/products", authenticateToken, getProducts);
