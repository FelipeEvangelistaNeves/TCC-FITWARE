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
  Treino,
  Exercicio,
  TreinoExercicio,
};
