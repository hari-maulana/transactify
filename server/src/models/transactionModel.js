import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Transaction = sequelize.define("Transaction", {
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
export const TransactionItem = sequelize.define("TransactionItem", {
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
