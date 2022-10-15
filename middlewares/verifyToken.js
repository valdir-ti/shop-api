const jwt = require("jsonwebtoken");

//Only Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) res.status(401).json({ message: "Invalid token" });
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "You are not autheticated" });
  }
};

//With Token and Authorized
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "You are not alowed to do that" });
    }
  });
};

//Only Admin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "You are not alowed to do that" });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
