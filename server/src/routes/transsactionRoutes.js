import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
} from "../controllers/transactionController.js";

export const transactionRouter = express.Router();

transactionRouter.post("/transactions", authenticateToken, createTransaction);
transactionRouter.get("/transactions", authenticateToken, getTransactions);
transactionRouter.delete(
  "/transactions/:id",
  authenticateToken,
  deleteTransaction
);
