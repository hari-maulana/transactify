import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { DataTypes } from "sequelize";
import { sequelize } from "./config/database.js";
import { User } from "./models/userModel.js";
import { Product } from "./models/productModel.js";
import { authenticateToken } from "./middlewares/authMiddleware.js";

import { authRouter } from "./routes/authRoutes.js";
import { productRouter } from "./routes/productRoutes.js";
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*", // Allow all origins by default, but preferably set specific origin in env
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400, // 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

// ROUTES
app.use("/", authRouter);
app.use("/", productRouter);

// Transaction model
const Transaction = sequelize.define("Transaction", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  invoiceNo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  customer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
});

// TransactionItem model
const TransactionItem = sequelize.define("TransactionItem", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  productCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  transactionId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

// Model Associations
Transaction.hasMany(TransactionItem, {
  foreignKey: "transactionId",
  onDelete: "CASCADE",
});
TransactionItem.belongsTo(Transaction, { foreignKey: "transactionId" });
User.hasMany(Transaction, { foreignKey: "userId" });
Transaction.belongsTo(User, { foreignKey: "userId" });

// Create transaction
app.post("/transactions", authenticateToken, async (req, res) => {
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
});

// Get transactions
app.get("/transactions", authenticateToken, async (req, res) => {
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
});

// Delete transaction (soft delete)
app.delete("/transactions/:id", authenticateToken, async (req, res) => {
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
});

// Start server
const PORT = process.env.PORT || 3000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
