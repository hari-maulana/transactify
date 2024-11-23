import jwt from "jsonwebtoken";

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
