const { Funcionario, Aluno } = require("../models");
const LoggerMessages = require("../loggerMessages");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { atualizarAluno } = require("./alunoController");
require("dotenv").config({
  quiet: true,
});

loginAdmin = async (req, res) => {
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

    if (funcionario.fu_cargo !== "Secretario") {
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
      secure: process.env.NODE_ENV === "production",
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
    console.error("Erro loginAdmin:", err);
    return res.status(500).json({
      success: false,
      message: LoggerMessages.SERVER_ERROR || "Erro no servidor",
    });
  }
};

criarAluno = async (req, res) => {
  try {
    const {
      al_nome,
      al_email,
      al_senha,
      al_cpf,
      al_telefone,
      al_dtnasc,
      al_pontos,
      al_treinos_completos,
      al_status,
    } = req.body;

    if (req.user.role !== "Secretario") {
      return res.status(403).json({
        message: "Apenas funcionários podem cadastrar alunos.",
      });
    }

    const senhaHash = await bcrypt.hash(al_senha, 10);

    const novoAluno = await Aluno.create({
      al_nome,
      al_email,
      al_senha: senhaHash,
      al_cpf,
      al_telefone,
      al_dtnasc,
      al_pontos,
      al_treinos_completos,
      al_status,
    });

    res.status(201).json({
      success: true,
      message: "Aluno criado com sucesso.",
      aluno: novoAluno,
    });
  } catch (err) {
    console.error("Erro ao criar aluno:", err);
    res.status(500).json({ message: "Erro no servidor." });
  }
};

atualizarAlunoAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    await Aluno.update(req.body, { where: { al_id: id } });

    res.json({ success: true, message: "Aluno atualizado." });
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar aluno." });
  }
};

deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;

    await Aluno.destroy({ where: { al_id: id } });

    res.json({ success: true, message: "Aluno deletado." });
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar aluno." });
  }
};

listarAlunosAdmin = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token ausente. Faça login novamente." });
    }

    // usuários decodificados pelo middleware já estão em req.user
    if (!req.user || req.user.role !== "Secretario") {
      return res.status(403).json({
        message: "Apenas funcionários podem visualizar os alunos.",
      });
    }

    const alunos = await Aluno.findAll({
      attributes: [
        "al_id",
        "al_nome",
        "al_email",
        "al_telefone",
        "al_pontos",
        "al_status",
        "al_treinos_completos",
      ],
    });

    if (!alunos || alunos.length === 0) {
      return res.status(404).json({ message: "Nenhum aluno encontrado" });
    }

    return res.json({
      success: true,
      alunos,
    });
  } catch (err) {
    console.error("Erro ao buscar dados dos alunos:", err);
    return res.status(500).json({
      message: "Erro ao buscar dados dos alunos.",
    });
  }
};

module.exports = {
  loginAdmin,
  criarAluno,
  atualizarAlunoAdmin,
  deletarAluno,
  listarAlunosAdmin,
};
