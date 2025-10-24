const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Aluno, Funcionario } = require("../models");
const LoggerMessages = require("../loggerMessages");
require("dotenv").config({
  quiet: true,
});
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    let user = null;
    let role = null;

    // Verifica se o e-mail pertence a um aluno
    const aluno = await Aluno.findOne({ where: { al_email: email } });
    if (aluno) {
      const senhaValida = await bcrypt.compare(senha, aluno.al_senha);
      if (!senhaValida) {
        return res
          .status(401)
          .json({ success: false, message: LoggerMessages.LOGIN_FAILED });
      }
      user = aluno;
      role = "Aluno";
    }

    // Caso não seja aluno, tenta buscar entre os funcionários
    if (!user) {
      const funcionario = await Funcionario.findOne({
        where: { fu_email: email },
      });
      if (!funcionario) {
        return res
          .status(401)
          .json({ success: false, message: LoggerMessages.USER_NOT_FOUND });
      }

      const senhaValida = await bcrypt.compare(senha, funcionario.fu_senha);
      if (!senhaValida) {
        return res
          .status(401)
          .json({ success: false, message: LoggerMessages.LOGIN_FAILED });
      }

      user = funcionario;
      role = funcionario.fu_cargo; // Professor ou Secretario, puxa do banco
    }

    // Cria o token JWT com o papel do usuário
    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Salva o token como cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true apenas em HTTPS (produção)
      sameSite: "lax",
      maxAge: 3600000, // 1 hora
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
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: LoggerMessages.SERVER_ERROR });
  }
};

// 🔒 Rota protegida (equivalente à sua protectedRoute)
exports.protectedRoute = async (req, res) => {
  try {
    const { id, role } = req.user; // vem do middleware JWT

    let user;
    if (role === "Aluno") {
      user = await Aluno.findByPk(id);
    } else {
      user = await Funcionario.findByPk(id);
    }

    if (!user) {
      return res.status(401).json({
        message: LoggerMessages.ROLE_ERROR,
        error: LoggerMessages.USER_NOT_FOUND,
      });
    }

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
    console.error(err);
    res.status(500).json({ error: LoggerMessages.SERVER_ERROR });
  }
};

// 🚪 Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  console.log(LoggerMessages.SESSION_DESTROYED);
  res.json({ success: true, message: LoggerMessages.SESSION_DESTROYED });
};
