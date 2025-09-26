function authMiddleware(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ error: "Não autenticado" });
}

module.exports = authMiddleware;
