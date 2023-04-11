const jwt = require("jsonwebtoken");

const getToken = (data) => {
  return jwt.sign(data, "JWT_SECRET_KEY", { expiresIn: "30m" });
};

const verifyToken = (token) => {
  return jwt.verify(token, "JWT_SECRET_KEY");
};

module.exports = { getToken, verifyToken };
