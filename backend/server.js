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
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// para garantir que OPTIONS funcione
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rotas
const authRoutes = require("./router/authRoutes");
const alunoRoutes = require("./router/alunoRoutes");
const professorRoutes = require("./router/professorRoutes");
const adminRoutes = require("./router/adminRoutes");
const treinoRoutes = require("./router/treinoRoutes");
const desafioRoutes = require("./router/desafioRoutes");
const avisosRoutes = require("./router/avisosRoutes");
const produtosRoutes = require("./router/produtosRoutes");
const resgatesRoutes = require("./router/resgatesRoutes");

app.use("/", authRoutes);
app.use("/aluno", alunoRoutes);
app.use("/professor", professorRoutes);
app.use("/admin", adminRoutes);
app.use("/treinos", treinoRoutes);
app.use("/desafios", desafioRoutes);
app.use("/avisos", avisosRoutes);
app.use("/produtos", produtosRoutes);
app.use("/resgates", resgatesRoutes);

// Swagger docs
swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger docs em http://localhost:${PORT}/api-docs`);
});
