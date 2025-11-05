const LoggerMessages = require("../loggerMessages");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware para verificar se o token JWT existe e é válido.
 * Salva as informações decodificadas em req.user.
 */
function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Armazena os dados decodificados do token
    next();
  } catch (err) {
    console.error("Erro ao verificar token:", err);
    return res.status(403).json({ message: "Token inválido ou expirado" });
  }
}

/**
 * Middleware para verificação de cargo 
 */
function roleMiddleware(roles = []) {
  return (req, res, next) => {
    try {
      let userRole = null;

      // 1️⃣ Se veio via JWT
      if (req.user && req.user.role) {
        userRole = req.user.role;
      }

      // 2️⃣ Sem dados de usuário → negar
      if (!userRole) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      // 3️⃣ Verifica se o cargo é permitido
      if (!roles.includes(userRole)) {
        return res
          .status(403)
          .json({ error: LoggerMessages.ACCESS_DENIED || "Acesso negado" });
      }

      // 4️⃣ Libera o fluxo
      next();
    } catch (err) {
      console.error("Erro no roleMiddleware:", err);
      return res.status(500).json({ error: "Erro interno de autenticação" });
    }
  };
}

module.exports = { verifyToken, roleMiddleware };