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

/**
 * 🔹 Buscar dados do professor logado (pelo token)
 */
const dataProfessor = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token ausente. Faça login novamente." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const funcionarioId = decoded.id;

    const funcionario = await Funcionario.findByPk(funcionarioId, {
      attributes: { exclude: ["fu_senha"] },
    });

    if (!funcionario) {
      return res.status(404).json({ message: "Funcionário não encontrado." });
    }

    const nomeFuncionario = funcionario.fu_nome || "";
    const [firstName, lastName] = nomeFuncionario.split(" ");
    const iniciais =
      (firstName ? firstName[0] : "") + (lastName ? lastName[0] : "");

    res.json({
      nome: funcionario.fu_nome,
      email: funcionario.fu_email,
      cargo: funcionario.fu_cargo,
      cpf: funcionario.fu_cpf,
      telefone: funcionario.fu_telefone,
      iniciais,
    });
  } catch (err) {
    console.error("Erro ao buscar dados do funcionário:", err);
    return res
      .status(500)
      .json({ message: "Erro ao buscar dados do funcionário." });
  }
};

/**
 * 🔹 Atualizar informações do professor logado
 */
const atualizarProfessor = async (req, res) => {
  try {
    const professorId = req.user.id; // vem do verifyToken
    const { nome, email, telefone, cargo } = req.body;

    if (!nome || !email) {
      return res.status(400).json({
        success: false,
        message: "Preencha todos os campos obrigatórios.",
      });
    }

    const funcionario = await Funcionario.findByPk(professorId);
    if (!funcionario) {
      return res
        .status(404)
        .json({ success: false, message: "Funcionário não encontrado." });
    }

    funcionario.fu_nome = nome;
    funcionario.fu_email = email;
    funcionario.fu_telefone = telefone || funcionario.fu_telefone;
    funcionario.fu_cargo = cargo || funcionario.fu_cargo;

    await funcionario.save();

    res.json({
      success: true,
      message: "Dados atualizados com sucesso!",
      funcionario: {
        id: funcionario.fu_id,
        nome: funcionario.fu_nome,
        email: funcionario.fu_email,
        telefone: funcionario.fu_telefone,
        cargo: funcionario.fu_cargo,
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar funcionário:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno ao atualizar dados." });
  }
};

module.exports = {
  loginProfessor,
  dataProfessor,
  atualizarProfessor,
};
