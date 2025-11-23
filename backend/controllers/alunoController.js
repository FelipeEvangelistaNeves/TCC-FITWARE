const { Aluno, Turma, Conversa, Funcionario, Mensagem } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config({ quiet: true });

/**
 * 🔹 Dados do aluno logado
 */
const dataAluno = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ message: "Token ausente. Faça login novamente." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const alunoId = decoded.id;

    const aluno = await Aluno.findByPk(alunoId, {
      attributes: { exclude: ["al_senha"] },
      include: [
        {
          model: Turma,
          attributes: ["tu_id", "tu_nome"],
          through: { attributes: [] },
        },
      ],
    });

    if (!aluno)
      return res.status(404).json({ message: "Aluno não encontrado." });

    const nomeAluno = aluno.al_nome || "";
    const [firstName, lastName] = nomeAluno.split(" ");
    const iniciais =
      (firstName ? firstName[0] : "") + (lastName ? lastName[0] : "");

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

/**
 * 🔹 Atualizar informações do aluno logado
 */
const atualizarAluno = async (req, res) => {
  try {
    const alunoId = req.user.id;
    const { nome, email } = req.body;

    if (!nome || !email)
      return res
        .status(400)
        .json({ success: false, message: "Preencha todos os campos." });

    const aluno = await Aluno.findByPk(alunoId);
    if (!aluno)
      return res
        .status(404)
        .json({ success: false, message: "Aluno não encontrado." });

    aluno.al_nome = nome;
    aluno.al_email = email;
    await aluno.save();

    res.json({
      success: true,
      message: "Dados atualizados com sucesso!",
      aluno: {
        id: aluno.al_id,
        nome: aluno.al_nome,
        email: aluno.al_email,
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno ao atualizar dados." });
  }
};

/**
 * 🔹 Conversas do aluno logado
 */
const dataAlunoConversas = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const alunoId = decoded.id;

    const conversas = await Conversa.findAll({
      where: { al_id: alunoId },
      include: [
        {
          model: Funcionario,
          attributes: [
            "fu_id", 
            "fu_nome", 
            "fu_email", 
            "fu_telefone"
          ],
        },
      ],
      order: [["co_id", "DESC"]],
    });

    return res.json({ conversas });
  } catch (error) {
    console.error("Erro ao buscar conversas:", error);
    return res.status(500).json({ message: "Erro ao buscar conversas." });
  }
};

const dataAlunoMensagem = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const alunoId = decoded.id;

    const conversaId = req.params.id;

    if (!conversaId) {
      return res.status(400).json({ message: "ID da conversa é obrigatório." });
    }

    const conversa = await Conversa.findOne({
      where: { co_id: conversaId, al_id: alunoId },
    });

    if (!conversa) {
      return res
        .status(403)
        .json({ message: "Acesso negado a esta conversa." });
    }

    const mensagens = await Mensagem.findAll({
      where: { co_id: conversaId },
      order: [["me_id", "ASC"]],
    });

    res.json({ mensagens });
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error);
    return res.status(500).json({ message: "Erro ao buscar mensagens." });
  }
}

module.exports = {
  dataAluno,
  atualizarAluno,
  dataAlunoConversas,
  dataAlunoMensagem,
};
