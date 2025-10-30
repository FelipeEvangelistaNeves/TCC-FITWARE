const { Sequelize, DataTypes } = require("sequelize");

const { sequelize } = require("../db/db");

// Importação dos models
const Aluno = require("./alunos")(sequelize, DataTypes);
const Funcionario = require("./funcionarios")(sequelize, DataTypes);
const Produto = require("./produtos")(sequelize, DataTypes);
const Desafio = require("./desafios")(sequelize, DataTypes);
const Pagamento = require("./pagamentos")(sequelize, DataTypes);
const Modalidade = require("./modalidades")(sequelize, DataTypes);
const Horario = require("./horarios")(sequelize, DataTypes);
const Turma = require("./turmas")(sequelize, DataTypes);
const AlunoTurma = require("./alunos_turmas")(sequelize, DataTypes);
const AlunoDesafio = require("./alunos_desafios")(sequelize, DataTypes);
const AlunoTreino = require("./alunos_treinos")(sequelize, DataTypes);
const Treino = require("./treinos")(sequelize, DataTypes);
const Exercicio = require("./exercicios")(sequelize, DataTypes);
const TreinoExercicio = require("./treinos_exercicios")(sequelize, DataTypes);

// ==================== RELACIONAMENTOS ====================

// 🔹 Aluno ↔ Pagamento (1:N)
Aluno.hasMany(Pagamento, { foreignKey: "pa_al_id" });
Pagamento.belongsTo(Aluno, { foreignKey: "pa_al_id" });

// 🔹 Modalidade ↔ Turma (1:N)
Modalidade.hasMany(Turma, { foreignKey: "tu_mod_id" });
Turma.belongsTo(Modalidade, { foreignKey: "tu_mod_id" });

// 🔹 Horário ↔ Turma (1:N)
Horario.hasMany(Turma, { foreignKey: "tu_hor_id" });
Turma.belongsTo(Horario, { foreignKey: "tu_hor_id" });

// 🔹 Funcionario ↔ Turma (1:N) (professor da turma)
Funcionario.hasMany(Turma, { foreignKey: "tu_prof_id" });
Turma.belongsTo(Funcionario, { foreignKey: "tu_prof_id" });

// 🔹 Aluno ↔ Turma (N:N) (via alunos_turmas)
Aluno.belongsToMany(Turma, {
  through: AlunoTurma,
  foreignKey: "al_id",
});
Turma.belongsToMany(Aluno, {
  through: AlunoTurma,
  foreignKey: "tu_id",
});

// 🔹 Aluno ↔ Desafio (N:N) (via alunos_desafios)
Aluno.belongsToMany(Desafio, {
  through: AlunoDesafio,
  foreignKey: "al_id",
});
Desafio.belongsToMany(Aluno, {
  through: AlunoDesafio,
  foreignKey: "de_id",
});

// 🔹 Aluno ↔ Treino (N:N) (via alunos_treinos)
Aluno.belongsToMany(Treino, {
  through: AlunoTreino,
  foreignKey: "al_id",
});
Treino.belongsToMany(Aluno, {
  through: AlunoTreino,
  foreignKey: "tr_id",
});

// 🔹 Funcionario ↔ Treino (1:N) (professor do treino)
Funcionario.hasMany(Treino, { foreignKey: "tr_prof_id" });
Treino.belongsTo(Funcionario, { foreignKey: "tr_prof_id" });

// 🔹 Treino ↔ Exercicio (N:N) (via treinos_exercicios)
Treino.belongsToMany(Exercicio, {
  through: TreinoExercicio,
  foreignKey: "tr_id",
});
Exercicio.belongsToMany(Treino, {
  through: TreinoExercicio,
  foreignKey: "ex_id",
});

// Métodos personalizados
Treino.findByProfId = async function (profId) {
  return await Treino.findAll({
    where: { tr_prof_id: profId },
    include: [
      {
        model: Funcionario,
        attributes: ["fu_id", "fu_nome"],
      },
      {
        model: Exercicio,
        through: { attributes: [] },
        attributes: ["ex_id", "ex_nome", "ex_grupo_muscular"],
      },
    ],
  });
};

// ==========================================================

// Exportar todos os models e a conexão
module.exports = {
  sequelize,
  Sequelize,
  Aluno,
  Funcionario,
  Produto,
  Desafio,
  Pagamento,
  Modalidade,
  Horario,
  Turma,
  AlunoTurma,
  AlunoDesafio,
  AlunoTreino,
  Treino,
  Exercicio,
  TreinoExercicio,
};
