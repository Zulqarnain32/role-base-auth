const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization; // Check both lowercase and uppercase
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log("The decoded user is", req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" }); // 401 Unauthorized for invalid tokens
  }
};

module.exports = verifyToken;
