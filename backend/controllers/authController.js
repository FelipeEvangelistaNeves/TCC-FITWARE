const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Aluno, Funcionario } = require("../models");
const LoggerMessages = require("../loggerMessages");
require("dotenv").config({ quiet: true });

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    let user = null;
    let role = null;

    // Verifica Aluno
    const aluno = await Aluno.findOne({ where: { al_email: email } });
    if (aluno) {
      const senhaValida = await bcrypt.compare(senha, aluno.al_senha);
      if (!senhaValida)
        return res.status(401).json({ message: LoggerMessages.LOGIN_FAILED });
      user = aluno;
      role = "Aluno";
    }

    // Verifica Funcionário
    if (!user) {
      const funcionario = await Funcionario.findOne({
        where: { fu_email: email },
      });
      if (!funcionario)
        return res.status(401).json({ message: LoggerMessages.USER_NOT_FOUND });

      const senhaValida = await bcrypt.compare(senha, funcionario.fu_senha);
      if (!senhaValida)
        return res.status(401).json({ message: LoggerMessages.LOGIN_FAILED });

      user = funcionario;
      role = funcionario.fu_cargo; // Ex: Professor, Secretario
    }

    // Cria token
    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, {
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
        id: user.id,
        nome: user.al_nome || user.fu_nome,
        email: user.al_email || user.fu_email,
        role,
      },
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ message: LoggerMessages.SERVER_ERROR });
  }
};

const protectedRoute = async (req, res) => {
  try {
    const { id, role } = req.user;

    const user =
      role === "Aluno"
        ? await Aluno.findByPk(id)
        : await Funcionario.findByPk(id); //if role is not Aluno, Funcionario

    if (!user)
      return res.status(401).json({ message: LoggerMessages.USER_NOT_FOUND });

    res.json({
      message: LoggerMessages.AUTH_SUCCESS,
      user: {
        id: user.id,
        nome: user.al_nome || user.fu_nome,
        email: user.al_email || user.fu_email,
        role,
      },
    });
  } catch (err) {
    console.error("Erro na rota protegida:", err);
    res.status(500).json({ message: LoggerMessages.SERVER_ERROR });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: LoggerMessages.SESSION_DESTROYED });
};

module.exports = { login, protectedRoute, logout };
