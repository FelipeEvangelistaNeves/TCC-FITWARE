module.exports = (sequelize, Datatypes) => {
  const AlunoDesafio = sequelize.define(
    "AlunoDesafio",
    {
      al_id: { type: Datatypes.INTEGER, primaryKey: true},
      de_id: { type: Datatypes.INTEGER, primaryKey: true},
    },
    {
      tableName: "alunos_desafios",
      timestamps: false,
    }
  );

  return AlunoDesafio;
}