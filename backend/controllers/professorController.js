// controllers/professorController.js
const { Funcionario } = require("../models");
const LoggerMessages = require("../loggerMessages");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  quiet: true,
});

const loginProfessor = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e password são obrigatórios.",
      });
    }

    // Busca o funcionário pelo e-mail (Sequelize)
    const funcionario = await Funcionario.findOne({
      where: { fu_email: email },
    });

    if (!funcionario) {
      return res
        .status(401)
        .json({ success: false, message: LoggerMessages.USER_NOT_FOUND });
    }

    // Verifica cargo (só Professor pode logar por essa rota)
    if (funcionario.fu_cargo !== "Professor") {
      return res.status(403).json({
        success: false,
        message: LoggerMessages.ROLE_ERROR || "Acesso negado",
      });
    }

    // Compara senha (assume que fu_senha é hash bcrypt — se não for, ver fallback temporário)
    const senhaValida = await bcrypt.compare(password, funcionario.fu_senha);
    if (!senhaValida) {
      return res
        .status(401)
        .json({ success: false, message: LoggerMessages.LOGIN_FAILED });
    }

    // Gerar JWT com id e role
    const token = jwt.sign(
      { id: funcionario.fu_id, role: funcionario.fu_cargo },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1h" }
    );

    // Envia token como cookie HTTP-only
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    // Retorna dados públicos do usuário
    return res.json({
      success: true,
      message: LoggerMessages.LOGIN_SUCESS || "Login realizado com sucesso",
      user: {
        id: funcionario.fu_id,
        nome: funcionario.fu_nome,
        email: funcionario.fu_email,
        role: funcionario.fu_cargo,
      },
    });
  } catch (err) {
    console.error("Erro loginProfessor:", err);
    return res.status(500).json({
      success: false,
      message: LoggerMessages.SERVER_ERROR || "Erro no servidor",
    });
  }
};

const dataProfessor = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token ausente. Faça login novamente." });
    }

    // 🔹 Decodifica o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const professorId = decoded.id;

    // 🔹 Busca o professor e inclui seus treinos e exercícios
    const professor = await Funcionario.findByPk(professorId, {
      attributes: ["fu_nome", "fu_email", "fu_cargo", "fu_telefone", "fu_cref"],
    });

    if (!professor) {
      return res.status(404).json({ message: "Professor não encontrado." });
    }

    // 🔹 Gera iniciais do nome
    const nomeProfessor = professor.fu_nome || "";
    const [firstName, lastName] = nomeProfessor.split(" ");
    const iniciais =
      (firstName ? firstName[0] : "") + (lastName ? lastName[0] : "");

    // 🔹 Resposta JSON final
    res.json({
      professor: {
        nome: professor.fu_nome,
        email: professor.fu_email,
        cargo: professor.fu_cargo,
        telefone: professor.fu_telefone,
        cref: professor.fu_cref,
      },
      iniciais,
    });

    console.log(professor);
  } catch (err) {
    console.error("Erro ao buscar dados do professor:", err);
    return res
      .status(500)
      .json({ message: "Erro ao buscar dados do professor." });
  }
};

module.exports = {
  loginProfessor,
  dataProfessor,
};
