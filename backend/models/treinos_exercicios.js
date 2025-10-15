module.exports = (sequelize, DataTypes) => {
  const TreinoExercicio = sequelize.define(
    "TreinoExercicio",
    {
      tr_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: "treinos", key: "tr_id"}},
      ex_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: "exercicios", key: "ex_id"}},
      te_repeticoes: {type: DataTypes.INTEGER, allowNull: false},
      te_series: { type: DataTypes.INTEGER, allowNull: false},
      te_descanso: { type: DataTypes.INTEGER, allowNull: false},
    },
    {
      tableName: "treinos_exercicios",
      timestamps: false,
    }
  );

  return TreinoExercicio;
};
