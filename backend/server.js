const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();
const PORT = 3000;
const authMiddleware = require("./middleware/auth").authMiddleware;
const roleMiddleware = require("./middleware/auth").roleMiddleware;

const { Aluno, Funcionario } = require("./models"); // importa models Sequelize

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("dotenv").config({
  quiet: true,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);

// --- Login Aluno ---
app.post("/login/aluno", async (req, res) => {
  const { email, password } = req.body;

  try {
    const aluno = await Aluno.findByEmail(email);

    if (!aluno || aluno.al_senha !== password) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    req.session.user = {
      id: aluno.al_id,
      email: aluno.al_email,
      role: "Aluno",
    };

    console.log("Sessão criada:", req.session.user);
    res.json({ message: "Login bem-sucedido", user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// --- Login Professor ---
app.post("/login/professor", (req, res) => {
  const { email, password } = req.body;
  const funcionario = FuncionarioModel.findByEmail(email);

  if (
    !funcionario ||
    funcionario.fu_senha !== password ||
    funcionario.fu_cargo !== "Professor"
  ) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  req.session.user = {
    id: funcionario.fu_id,
    email: funcionario.fu_email,
    role: "Professor",
  };
  console.log("Sessão criada:", req.session.user);
  res.json({ message: "Login bem-sucedido", user: req.session.user });
});

// --- Login Admin (Secretário) ---
app.post("/login/admin", (req, res) => {
  const { email, password } = req.body;
  const funcionario = FuncionarioModel.findByEmail(email);

  if (
    !funcionario ||
    funcionario.fu_senha !== password ||
    funcionario.fu_cargo !== "Secretario"
  ) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  req.session.user = {
    id: funcionario.fu_id,
    email: funcionario.fu_email,
    role: "Secretario",
  };
  console.log("Sessão criada:", req.session.user);
  res.json({ message: "Login bem-sucedido", user: req.session.user });
});

// --- Rotas protegidas ---
app.get(
  "/professor",
  authMiddleware,
  roleMiddleware(["Professor"]),
  (req, res) => {
    res.json({ message: "Área do professor" });
  }
);

app.get(
  "/admin",
  authMiddleware,
  roleMiddleware(["Secretario"]),
  (req, res) => {
    res.json({ message: "Área do admin" });
  }
);

app.get("/protected", authMiddleware, async (req, res) => {
  try {
    const { id, role } = req.session.user;

    let user;
    if (role === "Aluno") {
      user = await Aluno.findByPk(id);
    } else if (role === "Funcionario") {
      user = await Funcionario.findByPk(id);
    }

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    res.json({
      message: "Autenticado com sucesso",
      user: {
        id: user.id,
        nome: user.al_nome || user.fu_nome,
        email: user.al_email || user.fu_email,
        role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// --- Logout ---
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    console.log("Sessão destruída");
    res.json({ success: true, message: "Logout efetuado" });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
