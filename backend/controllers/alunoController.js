const { Aluno } = require("../models");
const LoggerMessages = require("../loggerMessages");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.loginAluno = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔍 Busca aluno pelo e-mail
    const aluno = await Aluno.findOne({ where: { al_email: email } });

    if (!aluno) {
      return res
        .status(401)
        .json({ success: false, message: LoggerMessages.USER_NOT_FOUND });
    }

    // 🔐 Compara senha com hash armazenado
    const senhaValida = await bcrypt.compare(password, aluno.al_senha);
    if (!senhaValida) {
      return res
        .status(401)
        .json({ success: false, message: LoggerMessages.LOGIN_FAILED });
    }

    // 🔑 Gera token JWT com ID e role
    const token = jwt.sign(
      { id: aluno.al_id, role: "Aluno" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1h" }
    );

    // 🍪 Envia token em cookie HTTP-only
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true apenas em produção com HTTPS
      sameSite: "lax",
      maxAge: 3600000, // 1h
    });

    console.log(LoggerMessages.LOGIN_SUCCESS, aluno.al_email);

    // ✅ Resposta de sucesso
    return res.json({
      success: true,
      message: LoggerMessages.LOGIN_SUCCESS,
      user: {
        id: aluno.al_id,
        nome: aluno.al_nome,
        email: aluno.al_email,
        role: "Aluno",
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: LoggerMessages.SERVER_ERROR });
  }
};
