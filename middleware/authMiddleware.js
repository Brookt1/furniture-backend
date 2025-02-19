const jwt = require("jsonwebtoken");

exports.verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "No token, authorization denied" });
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: err });
    req.user = user.UserInfo;
    next();
  });
};

exports.verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!allowedRoles.includes(req.user.role)) return res.sendStatus(401);
    } catch (e) {
      return res.sendStatus(401);
    }
    // if we have roles more than one
    // const result = req.roles.map(role => rolesArray.include(role)).find(val => val === true);

    next();
  };
};
