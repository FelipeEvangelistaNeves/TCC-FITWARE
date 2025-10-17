const LoggerMessages = require("../loggerMessages");

function authMiddleware(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ error: LoggerMessages.AUTH_FAILED });
}

function roleMiddleware(roles) {
  return (req, res, next) => {
    if (
      req.session &&
      req.session.user &&
      roles.includes(req.session.user.role)
    ) {
      return next();
    }
    return res.status(403).json({ error: LoggerMessages.ACESS_DENIED });
  };
}

module.exports = { authMiddleware, roleMiddleware };
