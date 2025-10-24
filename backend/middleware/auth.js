const LoggerMessages = require("../loggerMessages");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Token não fornecido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // salva dados do token na req
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido ou expirado" });
  }
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

module.exports = { verifyToken, roleMiddleware };
