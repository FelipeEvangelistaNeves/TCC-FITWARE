const {
  Aluno,
  Turma,
  Conversa,
  Funcionario,
  Mensagem,
  Treino,
  Desafio,
  Resgate,
  Produto,
} = require("../models");
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
      telefone: aluno.al_telefone,
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
          attributes: ["fu_id", "fu_nome", "fu_email", "fu_telefone"],
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
};

const enviarMensagemAluno = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const alunoId = decoded.id;

    const co_id = req.params.id;
    const { conteudo } = req.body;

    const conversa = await Conversa.findByPk(co_id);

    if (!conversa) {
      return res.status(404).json({ message: "Conversa não encontrada" });
    }

    // IDs corretos para o trigger
    const remetente_id = alunoId;
    const destinatario_id = conversa.prof_id;

    const remetente_tipo = "aluno";
    const destinatario_tipo = "professor";

    console.log("Enviando mensagem na conversa ID:", co_id);
    console.log("Conteudo:", conteudo);
    const novaMensagem = await Mensagem.create({
      co_id,
      remetente_id,
      destinatario_id,
      remetente_tipo,
      destinatario_tipo,
      me_conteudo: conteudo,
      me_tempo: new Date(),
      me_lida: false,
    });

    return res.json({ message: "Mensagem enviada", novaMensagem });
  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
    return res.status(500).json({ message: "Erro ao enviar mensagem" });
  }
};

/**
 * 🔹 Histórico completo do aluno (treinos, desafios, resgates)
 */
const historicodoAluno = async (req, res) => {
  try {
    const alunoId = req.user.id;

    const aluno = await Aluno.findByPk(alunoId, {
      include: [
        {
          model: Treino,
          attributes: ["tr_id", "tr_nome", "tr_descricao", "tr_dificuldade"],
          include: [
            {
              model: Funcionario,
              attributes: ["fu_nome"],
            },
          ],
          through: { attributes: [] },
        },
        {
          model: Desafio,
          attributes: ["de_id", "de_nome", "de_descricao"],
          through: { attributes: [] },
        },
      ],
    });

    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    // Treinos do aluno
    const treinos = (aluno.Treinos || []).map((t) => ({
      tipo: "treino",
      id: t.tr_id,
      titulo: t.tr_nome,
      descricao: t.tr_descricao,
      dificuldade: t.tr_dificuldade,
      professor: t.Funcionario?.fu_nome || "Sem professor",
      cor: "#7f24c6",
    }));

    // Desafios do aluno
    const desafios = (aluno.Desafios || []).map((d) => ({
      tipo: "desafio",
      id: d.de_id,
      titulo: d.de_nome,
      descricao: d.de_descricao,
      cor: "#ff6b35",
    }));

    // Resgates do aluno
    const resgates = await Resgate.findAll({
      where: { al_id: alunoId },
      include: [{ model: Produto, attributes: ["pd_nome"] }],
      order: [["re_data", "DESC"]],
    });

    const resgatados = resgates.map((r) => ({
      tipo: "resgate",
      id: r.re_id,
      titulo: r.Produto?.pd_nome || "Produto",
      hash: r.re_hash,
      data: r.re_data,
      cor: "#ffd700",
    }));

    // Combinar e ordenar por data
    const historico = [...treinos, ...desafios, ...resgatados];

    return res.status(200).json(historico);
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    return res.status(500).json({ error: "Erro ao buscar histórico" });
  }
};

/**
 * 🔹 Registrar treino como concluído
 */
const registrarTreinoConcluido = async (req, res) => {
  try {
    const alunoId = req.user.id;
    const { tr_id } = req.body;

    if (!tr_id) {
      return res.status(400).json({ error: "ID do treino é obrigatório" });
    }

    const { AlunoTreino } = require("../models");

    // Procura registro existente
    let alunoTreino = await AlunoTreino.findOne({
      where: { al_id: alunoId, tr_id },
    });

    const isFirstTime = !alunoTreino;

    if (!alunoTreino) {
      // Se não existe, cria novo
      alunoTreino = await AlunoTreino.create({
        al_id: alunoId,
        tr_id,
        at_data_conclusao: new Date(),
      });
    } else {
      // Se já existe, apenas atualiza a data
      alunoTreino.at_data_conclusao = new Date();
      await alunoTreino.save();
    }

    // SEMPRE incrementa o contador quando um treino é finalizado
    try {
      const aluno = await Aluno.findByPk(alunoId);
      if (aluno) {
        const contador_anterior = aluno.al_treinos_completos || 0;
        aluno.al_treinos_completos = contador_anterior + 1;
        await aluno.save();
      }
    } catch (updateError) {}

    res.json({
      message: "Treino registrado como concluído",
      treino: alunoTreino.dataValues,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar treino concluído" });
  }
};

module.exports = {
  dataAluno,
  atualizarAluno,
  dataAlunoConversas,
  dataAlunoMensagem,
  enviarMensagemAluno,
  historicodoAluno,
  registrarTreinoConcluido,
};
