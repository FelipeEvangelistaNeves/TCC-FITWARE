const LoggerMessages = require("../loggerMessages");
const {
  Treino,
  Funcionario,
  Aluno,
  Exercicio,
  AlunoDesafio,
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
      const exercicios = (tr.Exercicios || []).map((ex) => ({
        nome: ex.ex_nome,
        instrucao: ex.ex_instrucao,
        repeticoes: ex.TreinoExercicio?.te_repeticoes ?? null,
        series: ex.TreinoExercicio?.te_series ?? null,
        descanso: ex.TreinoExercicio?.te_descanso ?? null,
      }));

      return {
        id: tr.tr_id,
        tr_prof_id: tr.tr_prof_id,
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
      attributes: ["al_treinos_completos"],
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
              attributes: ["ex_id", "ex_nome", "ex_instrucao"],
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

    const desafiosAtivos = await AlunoDesafio.count({
      where: { al_id: alunoId, ad_status: "ativo" },
    });

    const treinos = aluno.Treinos.map((tr) => {
      const exercicios = (tr.Exercicios || []).map((ex) => ({
        nome: ex.ex_nome,
        instrucao: ex.ex_instrucao,
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

    return res.status(200).json({
      treinos,
      treinos_completos: aluno.al_treinos_completos,
      desafios_ativos: desafiosAtivos,
    });
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
          attributes: ["ex_id", "ex_nome", "ex_instrucao"],
          through: {
            attributes: ["te_series", "te_repeticoes", "te_descanso"],
          },
        },
        {
          model: Aluno,
          attributes: ["al_id", "al_nome"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!treino) {
      return res.status(404).json({ error: "Treino não encontrado" });
    }

    const exercicios = treino.Exercicios.map((ex) => ({
      id: ex.ex_id,
      ex_id: ex.ex_id,
      nome: ex.ex_nome,
      instrucao: ex.ex_instrucao,
      series: ex.TreinoExercicio.te_series,
      repeticoes: ex.TreinoExercicio.te_repeticoes,
      descanso: ex.TreinoExercicio.te_descanso,
    }));

    const alunos = (treino.Alunos || []).map((a) => ({
      al_id: a.al_id,
      al_nome: a.al_nome,
    }));

    const treinoFormatado = {
      id: treino.tr_id,
      nome: treino.tr_nome,
      descricao: treino.tr_descricao,
      dificuldade: treino.tr_dificuldade,
      funcionario: treino.Funcionario.fu_nome,
      exercicios,
      alunos,
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
      attributes: ["ex_id", "ex_nome", "ex_instrucao", "ex_grupo_muscular"],
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

// Listar todos os treinos (público/admin)
const listAllTreinos = async (req, res) => {
  try {
    const treinosRaw = await Treino.findAll({
      include: [
        { model: Funcionario, attributes: ["fu_nome"] },
        {
          model: Exercicio,
          attributes: ["ex_id"],
          through: { attributes: [] },
        },
        { model: Aluno, attributes: ["al_id"], through: { attributes: [] } },
      ],
    });

    const treinos = treinosRaw.map((tr) => ({
      id: tr.tr_id,
      nome: tr.tr_nome,
      descricao: tr.tr_descricao,
      dificuldade: tr.tr_dificuldade,
      funcionario: tr.Funcionario?.fu_nome || null,
      exercicios: (tr.Exercicios || []).length,
      atribuido: (tr.Alunos || []).length,
    }));

    return res.status(200).json(treinos);
  } catch (error) {
    console.error("Erro ao listar treinos:", error);
    return res.status(500).json({ error: "Erro ao listar treinos" });
  }
};

// Delegar (atribuir) um treino a um aluno
const delegarTreino = async (req, res) => {
  const userId = req.user && req.user.id;
  const userRole = req.user && req.user.role;
  const treinoId = req.params.id;
  const { al_id } = req.body;

  if (!userId)
    return res.status(401).json({ error: "Usuário não autenticado" });
  if (!al_id)
    return res.status(400).json({ error: "ID do aluno é obrigatório" });

  const t = await sequelize.transaction();
  try {
    const treino = await Treino.findByPk(treinoId, { transaction: t });
    if (!treino) {
      await t.rollback();
      return res.status(404).json({ error: "Treino não encontrado" });
    }

    // professor dono do treino ou secretario podem delegar
    if (userRole !== "Secretario" && treino.tr_prof_id !== userId) {
      await t.rollback();
      return res.status(403).json({ error: "Acesso negado" });
    }

    const aluno = await Aluno.findByPk(al_id, { transaction: t });
    if (!aluno) {
      await t.rollback();
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    // evita duplicatas
    const exists = await AlunoTreino.findOne({
      where: { al_id: aluno.al_id, tr_id: treino.tr_id },
      transaction: t,
    });
    if (exists) {
      await t.rollback();
      return res
        .status(400)
        .json({ error: "Treino já atribuído a este aluno" });
    }

    await AlunoTreino.create(
      { al_id: aluno.al_id, tr_id: treino.tr_id },
      { transaction: t }
    );

    await t.commit();
    return res.status(201).json({ message: "Treino atribuído ao aluno" });
  } catch (error) {
    await t.rollback();
    console.error("Erro ao delegar treino:", error);
    return res.status(500).json({ error: "Erro ao delegar treino" });
  }
};

// ======================== //
// ===== CRUD TREINOS ===== //
// ======================== //
const addTreino = async (req, res) => {
  const profId = req.user && req.user.id;

  if (!profId)
    return res.status(401).json({ error: "Usuário não autenticado" });

  const {
    tr_nome,
    tr_descricao,
    tr_dificuldade, // Recebe dificuldade do frontend
    alunos = [], // array de ids
    exercicios = [], // [{ nome, series, repeticoes, intrucao, descanso, ex_id? }]
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
        tr_dificuldade: tr_dificuldade || null,
      },
      { transaction: t }
    );

    // Processa exercícios: se vier ex_id usa o existente, senão cria novo exercício
    for (const exPayload of exercicios) {
      // Valida se exercício tem dados válidos
      if (!exPayload.ex_id && !exPayload.nome) continue;

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
            ex_instrucao: exPayload.intrucao || null,
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
    if (alunos.length === 0) {
      // Se nenhum aluno foi selecionado, vincula a TODOS
      const todosAlunos = await Aluno.findAll({ transaction: t });
      for (const aluno of todosAlunos) {
        await AlunoTreino.create(
          {
            al_id: aluno.al_id,
            tr_id: novoTreino.tr_id,
          },
          { transaction: t }
        );
      }
    } else {
      // Se alunos foram selecionados, vincula apenas aos selecionados
      for (const al_id of alunos) {
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
  const userRole = req.user && req.user.role;
  const treinoId = req.params.id;

  if (!profId)
    return res.status(401).json({ error: "Professor não autenticado" });

  const {
    tr_nome,
    tr_descricao,
    tr_dificuldade,
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

    // Apenas Secretário pode editar treinos
    // Professor só pode editar seus próprios treinos
    if (userRole === "Professor" && treino.tr_prof_id !== profId) {
      await t.rollback();
      return res.status(403).json({
        error:
          "Acesso negado: professores não podem editar treinos de outros professores ou da academia",
      });
    }

    // Atualiza campos do treino
    treino.tr_nome = tr_nome || treino.tr_nome;
    treino.tr_descricao = tr_descricao || treino.tr_descricao;
    treino.tr_dificuldade = tr_dificuldade || treino.tr_dificuldade;
    await treino.save({ transaction: t });

    // Remove associações antigas de exercícios e recria
    await TreinoExercicio.destroy({
      where: { tr_id: treino.tr_id },
      transaction: t,
    });

    for (const exPayload of exercicios) {
      // Valida se exercício tem dados válidos
      if (!exPayload.ex_id && !exPayload.nome) continue;

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
            ex_instrucao: exPayload.intrucao || null,
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

deletarTreino = async (req, res) => {
  const profId = req.user && req.user.id;
  const userRole = req.user && req.user.role;
  const treinoId = req.params.id;

  if (!profId)
    return res.status(401).json({ error: "Professor não autenticado" });

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

    // Apenas Secretário pode deletar treinos
    // Professor só pode deletar seus próprios treinos
    if (userRole === "Professor" && treino.tr_prof_id !== profId) {
      await t.rollback();
      return res.status(403).json({
        error:
          "Acesso negado: professores não podem excluir treinos de outros professores ou da academia",
      });
    }

    // Remove associações de exercícios
    await TreinoExercicio.destroy({
      where: { tr_id: treinoId },
      transaction: t,
    });

    // Remove associações de alunos
    await AlunoTreino.destroy({
      where: { tr_id: treinoId },
      transaction: t,
    });

    // Deleta o treino
    await Treino.destroy({
      where: { tr_id: treinoId },
      transaction: t,
    });

    await t.commit();
    return res.status(200).json({ message: "Treino deletado com sucesso" });
  } catch (error) {
    await t.rollback();
    console.error("Erro ao deletar treino:", error);
    return res.status(500).json({ error: "Erro ao deletar treino" });
  }
};

module.exports = {
  dataTreinosDoProfessor,
  dataTreinosDoAluno,
  dataDetalhesDoTreino,
  addTreino,
  updateTreino,
  deletarTreino,
  listarExercicios,
  criarExercicio,
  listAllTreinos,
  delegarTreino,
};
