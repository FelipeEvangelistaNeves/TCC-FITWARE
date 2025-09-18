// --- Middleware de proteção ---
export function authMiddleware(role) {
  return (req, res, next) => {
    if (!req.session.user) {
      console.log("Tentativa sem login");
      return res
        .status(401)
        .json({ success: false, message: "Não autorizado" });
    }

    if (req.session.user.role !== role) {
      console.log(
        `Acesso negado: usuário ${req.session.user.username} tentou acessar área de ${role}`
      );
      return res.status(403).json({ success: false, message: "Acesso negado" });
    }

    console.log(`Usuário autenticado como ${role}:`, req.session.user);
    next();
  };
}

export function roleMiddleware(roles) {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Não autorizado" });
    }

    if (!roles.includes(req.session.user.role)) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    next();
  };
}
