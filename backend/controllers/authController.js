const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Aluno, Funcionario } = require("../models");
const LoggerMessages = require("../loggerMessages");
const ROLES = require("../constants/roles");
require("dotenv").config({ quiet: true });

/**
 * 🔹 Login do aluno
 */
const loginAluno = async (req, res) => {
  const { email, password } = req.body;

  try {
    const aluno = await Aluno.findByEmail(email);

    if (!aluno) {
      return res
        .status(401)
        .json({ success: false, message: LoggerMessages.USER_NOT_FOUND });
    }

    const senhaValida = await bcrypt.compare(password, aluno.al_senha);
    if (!senhaValida) {
      return res
        .status(401)
        .json({ success: false, message: LoggerMessages.LOGIN_FAILED });
    }

    const token = jwt.sign(
      { id: aluno.al_id, role: ROLES.aluno },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true apenas em produção com HTTPS
      sameSite: "lax",
      maxAge: 3600000,
    });

    console.log(LoggerMessages.LOGIN_SUCCESS, aluno.al_email);

    return res.json({
      success: true,
      message: LoggerMessages.LOGIN_SUCCESS,
      user: {
        id: aluno.al_id,
        nome: aluno.al_nome,
        email: aluno.al_email,
        role: ROLES.aluno,
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: LoggerMessages.SERVER_ERROR });
  }
};

/**
 * 🔹 Login de professor
 */
const loginProfessor = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = null;
    let role = null;

    const funcionario = await Funcionario.findOne({
      where: { fu_email: email },
    });

    if (!funcionario) {
      return res.status(401).json({ message: LoggerMessages.USER_NOT_FOUND });
    }

    const senhaValida = await bcrypt.compare(password, funcionario.fu_senha);

    if (!senhaValida) {
      return res.status(401).json({ message: LoggerMessages.LOGIN_FAILED });
    }

    user = funcionario;
    role = funcionario.fu_cargo;

    if (role !== "Professor") {
      return res.status(403).json({
        success: false,
        message: LoggerMessages.ROLE_ERROR || "Acesso negado",
      });
    }

    // Cria token
    const token = jwt.sign({ id: user.fu_id, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Envia cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.json({
      success: true,
      message: LoggerMessages.LOGIN_SUCCESS,
      user: {
        id: user.fu_id,
        nome: user.fu_nome,
        email: user.fu_email,
        role,
      },
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ message: LoggerMessages.SERVER_ERROR });
  }
};

/**
 * 🔹 Login do Admin
 */
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e password são obrigatórios.",
      });
    }

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

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: LoggerMessages.SESSION_DESTROYED });
};

module.exports = {
  loginAluno,
  loginProfessor,
  loginAdmin,
  logout,
};
