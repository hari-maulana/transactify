import express from "express";
import cors from "cors";
import { sequelize } from "./config/database.js";
import { authRouter } from "./routes/authRoutes.js";
import { productRouter } from "./routes/productRoutes.js";
import { transactionRouter } from "./routes/transsactionRoutes.js";
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*", // Allow all origins by default
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400, // 24 hours
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());

// routes
app.use("/", authRouter);
app.use("/", productRouter);
app.use("/", transactionRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start server
const PORT = process.env.PORT || 3000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
