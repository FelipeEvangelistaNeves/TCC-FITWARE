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

    // Buscar aluno e seus treinos (N:N)
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

    // aluno.Treinos vem do relacionamento belongsToMany
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

module.exports = {
  dataTreinosDoProfessor,
  dataTreinosDoAluno,
};
