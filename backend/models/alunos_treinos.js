module.exports = (sequelize, Datatypes) => {
  const AlunoTreino = sequelize.define(
    "AlunoTreino",
    {
      al_id: { type: Datatypes.INTEGER, primaryKey: true},
      tr_id: { type: Datatypes.INTEGER, primaryKey: true},
    },
    {
      tableName: "alunos_treinos",
      timestamps: false,
    }
  );

  return AlunoTreino;
}