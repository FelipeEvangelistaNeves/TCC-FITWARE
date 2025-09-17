const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();
const PORT = 3000;

const AlunoModel = require("./models/alunos");

// --- Middleware ---
app.use(
  cors({
    origin: "http://localhost:5173", // frontend
    methods: ["GET", "POST"],
    credentials: true, // permite envio de cookies
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("dotenv").config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Em produção, use true com HTTPS
      httpOnly: true, // cookie não acessível no JS do cliente
      maxAge: 1000 * 60 * 60, // 1 hora
    },
  })
);
/*
// --- Login ---
app.post("/loginaluno", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123") {
    req.session.user = username;
    console.log("Sessão criada:", req.session.user);
    return res.json({ success: true, message: "Login realizado com sucesso!" });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Usuário ou senha inválidos!" });
  }
});
*/

// --- Login ---
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const aluno = AlunoModel.findByUsername(username);

  if (!aluno || aluno.password !== password) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  // salva o aluno na sessão
  req.session.user = { id: aluno.id, username: aluno.username }; // padroniza
  console.log("Sessão criada:", req.session.user);
  res.json({ message: "Login bem-sucedido", user: req.session.user });
});

// --- Middleware de proteção ---
function authMiddleware(req, res, next) {
  if (req.session.user) {
    console.log("Usuário autenticado:", req.session.user);
    return next();
  }
  console.log("Tentativa sem login");
  return res.status(401).json({ success: false, message: "Não autorizado" });
}

// --- Rota protegida ---
app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Bem-vindo à área protegida!",
    user: req.session.user,
  });
});

// --- Logout ---
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid"); // remove o cookie da sessão
    console.log("Sessão destruída");
    res.json({ success: true, message: "Logout efetuado" });
  });
});

// --- Iniciar servidor ---
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
