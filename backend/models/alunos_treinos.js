module.exports = (sequelize, Datatypes) => {
  const AlunoTreino = sequelize.define(
    "AlunoTreino",
    {
      al_id: { type: Datatypes.INTEGER, primaryKey: true, references: { model: "alunos", key: "al_id" }},
      tr_id: { type: Datatypes.INTEGER, primaryKey: true, references: { model: "treinos", key: "tr_id"}},
    },
    {
      tableName: "alunos_treinos",
      timestamps: false,
    }
  );

  return AlunoTreino;
}