const jwt = require("jsonwebtoken");

const authorization = (permissions) => {
  return (req, res, next) => {
    const role = req.user.role;
    if (permissions.includes(role)) {
      next();
    } else {
      res.status(401).send({ message: "Invalid Access" });
    }
  };
};

const authentication = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

module.exports = { authorization, authentication };
