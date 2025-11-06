const jwt = require("jsonwebtoken");
const LoggerMessages = require("../loggerMessages");
require("dotenv").config({ quiet: true });

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Erro ao verificar token:", err);
    res.status(403).json({ message: "Token inválido ou expirado" });
  }
}

function roleMiddleware(roles = []) {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role;
      if (!userRole) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      if (!roles.includes(userRole)) {
        return res
          .status(403)
          .json({ error: LoggerMessages.ACCESS_DENIED || "Acesso negado" });
      }

      next();
    } catch (err) {
      console.error("Erro no roleMiddleware:", err);
      res.status(500).json({ error: "Erro interno de autenticação" });
    }
  };
}

module.exports = { verifyToken, roleMiddleware };
