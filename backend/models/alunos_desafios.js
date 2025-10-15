module.exports = (sequelize, Datatypes) => {
  const AlunoDesafio = sequelize.define(
    "AlunoDesafio",
    {
      al_id: { type: Datatypes.INTEGER, primaryKey: true, references: { model: "alunos", key: "al_id"} },
      de_id: { type: Datatypes.INTEGER, primaryKey: true, references: { model: "desafios", key: "de_id"}},
    },
    {
      tableName: "alunos_desafios",
      timestamps: false,
    }
  );

  return AlunoDesafio;
}