const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config({ quiet: true });

const app = express();
const PORT = 3000;

// Swagger
const swaggerDocs = require("./swagger");

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// Rotas
const alunoRoutes = require("./router/alunoRoutes");
const professorRoutes = require("./router/professorRoutes");
const adminRoutes = require("./router/adminRoutes");
const authRoutes = require("./router/authRoutes");

app.use("/login/aluno", alunoRoutes);
app.use("/login/professor", professorRoutes);
app.use("/login/admin", adminRoutes);
app.use("/", authRoutes);

// Swagger docs
swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger docs em http://localhost:${PORT}/api-docs`);
});
