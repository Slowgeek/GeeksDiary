const jwt = require("jsonwebtoken");
const JWT = process.env.JWT_SEC;
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(token);
  if (!token) {
    return res.status(403).send({ message: "No token Provided" });
  }
  jwt.verify(token, JWT, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    console.log("object");
    const ID = decoded.id.substring(0, 24);
    console.log(ID);
    req.userId = ID;
    next();
  });
};
const authJwt = {
  verifyToken,
};
module.exports = authJwt;
