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
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());

// Rotas
const alunoRoutes = require("./router/alunoRoutes");
const professorRoutes = require("./router/professorRoutes");
const adminRoutes = require("./router/adminRoutes");
const authRoutes = require("./router/authRoutes");
const treinoRoutes = require("./router/treinoRoutes");

// Logins
app.use("/login/aluno", alunoRoutes);
app.use("/login/professor", professorRoutes);
app.use("/login/admin", adminRoutes);
app.use("/", authRoutes);

// API Fetch
app.use("/api/treinos", treinoRoutes);

// Swagger docs
swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger docs em http://localhost:${PORT}/api-docs`);
});
