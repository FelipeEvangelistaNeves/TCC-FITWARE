const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true, //permite enviar cookies
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "segredo-super-seguro",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Em produção, use 'true' com HTTPS
  })
);

// rota de login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123") {
    req.session.user = username;
    return res.json({ success: true, message: "Login realizado com sucesso!" });
  }

  res
    .status(401)
    .json({ success: false, message: "Usuário ou senha inválidos!" });
});

// rota protegida
app.get("/protected", (req, res) => {
  if (req.session.user) {
    return res.json({
      success: true,
      user: req.session.user,
      data: "Conteúdo protegido",
    });
  }
  res.status(401).json({ success: false, message: "Não autorizado" });
});

// logout
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, message: "Logout efetuado" });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
