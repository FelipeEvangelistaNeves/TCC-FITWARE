const { Aluno, Turma } = require("../models");
const LoggerMessages = require("../loggerMessages");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  quiet: true,
});

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
      { id: aluno.al_id, role: "Aluno" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true apenas em produção com HTTPS
      sameSite: "lax",
      maxAge: 3600000, // 1h
    });

    console.log(LoggerMessages.LOGIN_SUCCESS, aluno.al_email);

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

const dataAluno = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token ausente. Faça login novamente." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const alunoId = decoded.id;

    const aluno = await Aluno.findByPk(alunoId, {
      attributes: { exclude: ["al_senha"] },
      include: [
        {
          model: Turma, // Inclui o modelo Turma
          attributes: ["tu_id", "tu_nome"], // Seleciona apenas o ID e o Nome da Turma
          through: {
            attributes: [], // Opcional: Não incluir campos da tabela de ligação (alunos_turmas)
          },
        },
      ],
    });

    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado." });
    }

    const nomeAluno = aluno.al_nome || "";
    const [firstName, lastName] = nomeAluno.split(" ");
    const iniciais =
      (firstName ? firstName[0] : "") + (lastName ? lastName[0] : "");

    // 🚨 MODIFICAÇÃO CHAVE: Adicionar a propriedade 'turmas' à resposta JSON
    res.json({
      nome: aluno.al_nome,
      email: aluno.al_email,
      pontos: aluno.al_pontos,
      iniciais,
      turmas: aluno.Turmas,
    });
  } catch (err) {
    console.error("Erro ao buscar dados do aluno:", err);
    return res.status(500).json({ message: "Erro ao buscar dados do aluno." });
  }
};

// ---

module.exports = {
  loginAluno,
  dataAluno,
};
