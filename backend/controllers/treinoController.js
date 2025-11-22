const LoggerMessages = require("../loggerMessages");
const { Treino, Funcionario, Aluno, Exercicio } = require("../models");

const dataTreinosDoProfessor = async (req, res) => {
  try {
    const profId = req.user.id; // ID do prof que está logado

    const prof = await Funcionario.findByPk(profId, {
      attributes: { exclude: ["fu_senha"] },
    });

    if (!prof) {
      return res.status(404).json({ message: "Professor não encontrado." });
    }

    const treinos = await Treino.findByProfId(profId);

    return res.status(200).json(treinos);
  } catch (error) {
    console.error(LoggerMessages.TREINOS_FAILED, error);
    return res.status(500).json({ error: LoggerMessages.TREINOS_FAILED });
  }
};

const dataTreinosDoAluno = async (req, res) => {
  try {
    const alunoId = req.user.id;

    // Buscar treinos através da associação N:N (alunos_treinos)
    const treinosRaw = await Aluno.findOne({
      where: { al_id: alunoId },
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
    });

    const treinos = treinosRaw.map((tr) => {
      // Extrair até 3 exercícios
      const exercicios = (tr.Exercicios || []).slice(0, 3).map((ex) => ({
        nome: ex.ex_nome,
        repeticoes: ex.TreinoExercicio
          ? ex.TreinoExercicio.te_repeticoes
          : null,
        series: ex.TreinoExercicio ? ex.TreinoExercicio.te_series : null,
        descanso: ex.TreinoExercicio ? ex.TreinoExercicio.te_descanso : null,
      }));

      return {
        id: tr.tr_id,
        nome: tr.tr_nome,
        dificuldade: tr.tr_dificuldade,
        funcionario: tr.Funcionario ? tr.Funcionario.fu_nome : null,
        exercicios,
      };
    });

    return res.status(200).json(treinos);
  } catch (error) {
    console.error(LoggerMessages.TREINOS_FAILED, error);
    return res.status(500).json({ error: LoggerMessages.TREINOS_FAILED });
  }
};

module.exports = {
  dataTreinosDoProfessor,
  dataTreinosDoAluno,
};
