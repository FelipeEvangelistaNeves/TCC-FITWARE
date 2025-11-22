const LoggerMessages = require("../loggerMessages");
const {
  Treino,
  Funcionario,
  Aluno,
  Exercicio,
  TreinoExercicio,
  AlunoTreino,
  sequelize,
} = require("../models");

const dataTreinosDoProfessor = async (req, res) => {
  try {
    const profId = req.user.id;

    const prof = await Funcionario.findByPk(profId, {
      attributes: { exclude: ["fu_senha"] },
    });

    if (!prof) {
      return res.status(404).json({ message: "Professor não encontrado." });
    }

    const treinosRaw = await Treino.findByProfId(profId);

    const treinos = treinosRaw.map((tr) => {
      const exercicios = (tr.Exercicios || []).slice(0, 3).map((ex) => ({
        nome: ex.ex_nome,
        repeticoes: ex.TreinoExercicio?.te_repeticoes ?? null,
        series: ex.TreinoExercicio?.te_series ?? null,
        descanso: ex.TreinoExercicio?.te_descanso ?? null,
      }));

      return {
        id: tr.tr_id,
        nome: tr.tr_nome,
        descricao: tr.tr_descricao,
        dificuldade: tr.tr_dificuldade,
        funcionario: tr.Funcionario?.fu_nome ?? null,
        exercicios,
      };
    });

    return res.status(200).json(treinos);
  } catch (error) {
    console.error(LoggerMessages.TREINOS_FAILED, error);
    return res.status(500).json({ error: LoggerMessages.TREINOS_FAILED });
  }
};

const dataTreinosDoAluno = async (req, res) => {
  try {
    const alunoId = req.user.id;

    const aluno = await Aluno.findOne({
      where: { al_id: alunoId },
      include: [
        {
          model: Treino,
          attributes: ["tr_id", "tr_nome", "tr_descricao", "tr_dificuldade"],
          include: [
            {
              model: Funcionario,
              attributes: ["fu_id", "fu_nome"],
            },
            {
              model: Exercicio,
              attributes: ["ex_id", "ex_nome"],
              through: {
                attributes: ["te_repeticoes", "te_series", "te_descanso"],
              },
            },
          ],
        },
      ],
    });

    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    const treinos = aluno.Treinos.map((tr) => {
      const exercicios = (tr.Exercicios || []).slice(0, 3).map((ex) => ({
        nome: ex.ex_nome,
        repeticoes: ex.TreinoExercicio?.te_repeticoes ?? null,
        series: ex.TreinoExercicio?.te_series ?? null,
        descanso: ex.TreinoExercicio?.te_descanso ?? null,
      }));

      return {
        id: tr.tr_id,
        nome: tr.tr_nome,
        descricao: tr.tr_descricao,
        dificuldade: tr.tr_dificuldade,
        funcionario: tr.Funcionario?.fu_nome ?? null,
        exercicios,
      };
    });

    return res.status(200).json(treinos);
  } catch (error) {
    console.error(LoggerMessages.TREINOS_FAILED, error);
    return res.status(500).json({ error: LoggerMessages.TREINOS_FAILED });
  }
};

// 🔹 NOVA FUNÇÃO → Buscar detalhes completos de 1 treino
const dataDetalhesDoTreino = async (req, res) => {
  try {
    const treinoId = req.params.id;

    const treino = await Treino.findOne({
      where: { tr_id: treinoId },
      attributes: ["tr_id", "tr_nome", "tr_descricao", "tr_dificuldade"],
      include: [
        {
          model: Funcionario,
          attributes: ["fu_nome"],
        },
        {
          model: Exercicio,
          attributes: ["ex_id", "ex_nome"],
          through: {
            attributes: ["te_series", "te_repeticoes", "te_descanso"],
          },
        },
      ],
    });

    if (!treino) {
      return res.status(404).json({ error: "Treino não encontrado" });
    }

    const exercicios = treino.Exercicios.map((ex) => ({
      id: ex.ex_id,
      nome: ex.ex_nome,
      series: ex.TreinoExercicio.te_series,
      repeticoes: ex.TreinoExercicio.te_repeticoes,
      descanso: ex.TreinoExercicio.te_descanso,
    }));

    const treinoFormatado = {
      id: treino.tr_id,
      nome: treino.tr_nome,
      descricao: treino.tr_descricao,
      dificuldade: treino.tr_dificuldade,
      funcionario: treino.Funcionario.fu_nome,
      exercicios,
    };

    return res.status(200).json(treinoFormatado);
  } catch (error) {
    console.error("Erro ao buscar detalhes do treino:", error);
    return res.status(500).json({ error: "Erro ao buscar detalhes" });
  }
};

// Listar todos os exercícios (para dropdown)
const listarExercicios = async (req, res) => {
  try {
    const exames = await Exercicio.findAll({
      attributes: ["ex_id", "ex_nome", "ex_grupo_muscular"],
    });
    return res.status(200).json({ exercicios: exames });
  } catch (error) {
    console.error("Erro ao listar exercícios:", error);
    return res.status(500).json({ error: "Erro ao listar exercícios" });
  }
};

// Criar novo exercício (usado pelo botão 'Adicionar novo exercício')
const criarExercicio = async (req, res) => {
  try {
    const {
      ex_nome,
      ex_instrucao,
      ex_grupo_muscular,
      ex_video,
      ex_dificuldade,
    } = req.body;
    if (!ex_nome)
      return res.status(400).json({ error: "Nome do exercício é obrigatório" });

    const novo = await Exercicio.create({
      ex_nome,
      ex_instrucao: ex_instrucao || null,
      ex_video: ex_video || null,
      ex_grupo_muscular: ex_grupo_muscular || null,
      ex_dificuldade: ex_dificuldade || null,
    });

    return res.status(201).json({ exercicio: novo });
  } catch (error) {
    console.error("Erro ao criar exercício:", error);
    return res.status(500).json({ error: "Erro ao criar exercício" });
  }
};

// ======================== //
// ===== CRUD TREINOS ===== //
// ======================== //
addTreino = async (req, res) => {
  const profId = req.user && req.user.id;

  if (!profId)
    return res.status(401).json({ error: "Professor não autenticado" });

  const {
    tr_nome,
    tr_descricao,
    tr_categoria, // será salvo em tr_dificuldade
    alunos = [], // array de ids
    exercicios = [], // [{ nome, series, repeticoes, observacoes, ex_id? }]
  } = req.body;

  if (!tr_nome)
    return res.status(400).json({ error: "Nome do treino é obrigatório" });

  const t = await sequelize.transaction();

  try {
    // Cria o treino
    const novoTreino = await Treino.create(
      {
        tr_prof_id: profId,
        tr_nome,
        tr_descricao: tr_descricao || null,
        tr_dificuldade: tr_categoria || null,
      },
      { transaction: t }
    );

    // Processa exercícios: se vier ex_id usa o existente, senão cria novo exercício
    for (const exPayload of exercicios) {
      let exRecord = null;

      if (exPayload.ex_id) {
        exRecord = await Exercicio.findByPk(exPayload.ex_id, {
          transaction: t,
        });
      }

      if (!exRecord) {
        exRecord = await Exercicio.create(
          {
            ex_nome: exPayload.nome || "",
            ex_instrucao: exPayload.observacoes || null,
            ex_video: null,
            ex_grupo_muscular: null,
            ex_dificuldade: null,
          },
          { transaction: t }
        );
      }

      // Insere na tabela join treinos_exercicios
      await TreinoExercicio.create(
        {
          tr_id: novoTreino.tr_id,
          ex_id: exRecord.ex_id,
          te_repeticoes: parseInt(exPayload.repeticoes) || 0,
          te_series: parseInt(exPayload.series) || 0,
          te_descanso: parseInt(exPayload.descanso) || 60,
        },
        { transaction: t }
      );
    }

    // Vincula alunos ao treino
    for (const al_id of alunos) {
      // opcional: verificar se aluno existe
      const aluno = await Aluno.findByPk(al_id, { transaction: t });
      if (aluno) {
        await AlunoTreino.create(
          {
            al_id: aluno.al_id,
            tr_id: novoTreino.tr_id,
          },
          { transaction: t }
        );
      }
    }

    await t.commit();

    return res
      .status(201)
      .json({ message: "Treino criado", id: novoTreino.tr_id });
  } catch (error) {
    await t.rollback();
    console.error("Erro ao criar treino:", error);
    return res.status(500).json({ error: "Erro ao criar treino" });
  }
};

updateTreino = async (req, res) => {
  const profId = req.user && req.user.id;
  const treinoId = req.params.id;

  if (!profId)
    return res.status(401).json({ error: "Professor não autenticado" });

  const {
    tr_nome,
    tr_descricao,
    tr_categoria,
    alunos = [],
    exercicios = [],
  } = req.body;

  const t = await sequelize.transaction();

  try {
    const treino = await Treino.findOne({
      where: { tr_id: treinoId },
      transaction: t,
    });
    if (!treino) {
      await t.rollback();
      return res.status(404).json({ error: "Treino não encontrado" });
    }

    if (treino.tr_prof_id !== profId) {
      await t.rollback();
      return res
        .status(403)
        .json({ error: "Acesso negado: não é dono do treino" });
    }

    // Atualiza campos do treino
    treino.tr_nome = tr_nome || treino.tr_nome;
    treino.tr_descricao = tr_descricao || treino.tr_descricao;
    treino.tr_dificuldade = tr_categoria || treino.tr_dificuldade;
    await treino.save({ transaction: t });

    // Remove associações antigas de exercícios e recria
    await TreinoExercicio.destroy({
      where: { tr_id: treino.tr_id },
      transaction: t,
    });

    for (const exPayload of exercicios) {
      let exRecord = null;

      if (exPayload.ex_id) {
        exRecord = await Exercicio.findByPk(exPayload.ex_id, {
          transaction: t,
        });
      }

      if (!exRecord) {
        exRecord = await Exercicio.create(
          {
            ex_nome: exPayload.nome || "",
            ex_instrucao: exPayload.observacoes || null,
            ex_video: null,
            ex_grupo_muscular: null,
            ex_dificuldade: null,
          },
          { transaction: t }
        );
      }

      await TreinoExercicio.create(
        {
          tr_id: treino.tr_id,
          ex_id: exRecord.ex_id,
          te_repeticoes: parseInt(exPayload.repeticoes) || 0,
          te_series: parseInt(exPayload.series) || 0,
          te_descanso: parseInt(exPayload.descanso) || 60,
        },
        { transaction: t }
      );
    }

    // Atualiza alunos: remove antigos e recria
    await AlunoTreino.destroy({
      where: { tr_id: treino.tr_id },
      transaction: t,
    });
    for (const al_id of alunos) {
      const aluno = await Aluno.findByPk(al_id, { transaction: t });
      if (aluno) {
        await AlunoTreino.create(
          { al_id: aluno.al_id, tr_id: treino.tr_id },
          { transaction: t }
        );
      }
    }

    await t.commit();
    return res.status(200).json({ message: "Treino atualizado" });
  } catch (error) {
    await t.rollback();
    console.error("Erro ao atualizar treino:", error);
    return res.status(500).json({ error: "Erro ao atualizar treino" });
  }
};

module.exports = {
  dataTreinosDoProfessor,
  dataTreinosDoAluno,
  dataDetalhesDoTreino, // <-- NOVO
  addTreino,
  updateTreino,
  listarExercicios,
  criarExercicio,
};
