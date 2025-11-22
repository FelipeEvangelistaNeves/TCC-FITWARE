const LoggerMessages = require("../loggerMessages");
const { Treino, Funcionario, Aluno, Exercicio } = require("../models");

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

module.exports = {
  dataTreinosDoProfessor,
  dataTreinosDoAluno,
  dataDetalhesDoTreino, // <-- NOVO
};
