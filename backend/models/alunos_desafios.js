module.exports = (sequelize, DataTypes) => {
  const AlunoDesafio = sequelize.define(
    "AlunoDesafio",
    {
      al_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: "alunos", key: "al_id"} },
      de_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: "desafios", key: "de_id"}},
    },
    {
      tableName: "alunos_desafios",
      timestamps: false,
    }
  );

  return AlunoDesafio;
}