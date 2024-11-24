import { v4 as uuidv4 } from "uuid";
import { User } from "../models/userModel.js";
import { Product } from "../models/productModel.js";
import { Transaction, TransactionItem } from "../models/transactionModel.js";

Transaction.hasMany(TransactionItem, {
  foreignKey: "transactionId",
  onDelete: "CASCADE",
});

TransactionItem.belongsTo(Transaction, { foreignKey: "transactionId" });
User.hasMany(Transaction, { foreignKey: "userId" });
Transaction.belongsTo(User, { foreignKey: "userId" });

// Create transaction
export const createTransaction = async (req, res) => {
  const requestId = uuidv4();
  const { invoiceNo, date, customer, product } = req.body;

  try {
    // Validate product codes
    for (const item of product) {
      const existingProduct = await Product.findOne({
        where: { productCode: item.productCode, userId: req.user.userId },
      });
      if (!existingProduct) {
        return res.status(400).json({
          requestId,
          data: null,
          message: `Product with code ${item.productCode} does not exist`,
          success: false,
        });
      }
    }

    // Create transaction
    const transaction = await Transaction.create({
      invoiceNo,
      date,
      customer,
      userId: req.user.userId,
    });

    // Add transaction items
    for (const item of product) {
      await TransactionItem.create({
        productCode: item.productCode,
        quantity: item.quantity,
        transactionId: transaction.id,
      });
    }

    const transactionData = await Transaction.findOne({
      where: { id: transaction.id },
      include: [TransactionItem],
    });

    res.status(201).json({
      requestId,
      data: transactionData,
      message: "Transaction created successfully",
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

// Get transactions
export const getTransactions = async (req, res) => {
  const requestId = uuidv4();

  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.user.userId, deletedAt: null },
      include: [TransactionItem],
    });

    res.json({
      requestId,
      data: transactions,
      message: "Transactions fetched successfully",
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

// Delete transaction (soft delete)
export const deleteTransaction = async (req, res) => {
  const requestId = uuidv4();
  const { id } = req.params;

  try {
    const transaction = await Transaction.findOne({
      where: { id, userId: req.user.userId },
    });
    if (!transaction) {
      return res.status(404).json({
        requestId,
        data: null,
        message: "Transaction not found",
        success: false,
      });
    }

    await transaction.update({ deletedAt: new Date() });

    res.json({
      requestId,
      data: null,
      message: "Transaction deleted successfully",
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
