const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, "your-secret-key", (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        // Token has expired
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized: Token has expired" });
      }
      // Other token verification errors
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = authenticateUser;
