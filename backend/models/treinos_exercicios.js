module.exports = (sequelize, DataTypes) => {
  const TreinoExercicio = sequelize.define(
    "TreinoExercicio",
    {
      tr_id: { type: DataTypes.INTEGER, primaryKey: true },
      ex_id: { type: DataTypes.INTEGER, primaryKey: true },
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
