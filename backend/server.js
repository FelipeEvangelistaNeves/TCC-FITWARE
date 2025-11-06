require("dotenv").config({ quiet: true });
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3000;

const swaggerDocs = require("./swagger");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rotas
const alunoRoutes = require("./router/alunoRoutes");
const professorRoutes = require("./router/professorRoutes");
const adminRoutes = require("./router/adminRoutes");
const authRoutes = require("./router/authRoutes");
const treinoRoutes = require("./router/treinoRoutes");
const desafioRoutes = require("./router/desafioRoutes");
const avisosRoutes = require("./router/avisosRoutes");
const produtosRoutes = require("./router/produtosRoutes");
// Logins
app.use("/aluno", alunoRoutes);
app.use("/professor", professorRoutes);
app.use("/admin", adminRoutes);
app.use("/", authRoutes);

// API Fetch
app.use("/api/alunos", alunoRoutes);
app.use("/api/professores", professorRoutes);
app.use("/api/treinos", treinoRoutes);
app.use("/api/desafios", desafioRoutes);

//avisos
app.use("/api/Allavisos", avisosRoutes);

//brindes / produtos
app.use("/api/produtos", produtosRoutes);

// Swagger docs
swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger docs em http://localhost:${PORT}/api-docs`);
});
