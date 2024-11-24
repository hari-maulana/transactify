import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// JWT configuration
const JWT_SECRET = "your-secret-key";
const JWT_REFRESH_SECRET = "your-refresh-secret-key";

export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      requestId: uuidv4(),
      data: null,
      message: "Access token is required",
      success: false,
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        requestId: uuidv4(),
        data: null,
        message: "Invalid or expired token",
        success: false,
      });
    }
    req.user = user; // Attach user data to the request
    next();
  });
};
