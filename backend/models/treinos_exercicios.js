module.exports = (sequelize, DataTypes) => {
  const TreinoExercicio = sequelize.define(
    "TreinoExercicio",
    {
      tr_id: { type: DataTypes.INTEGER, primaryKey: true },
      ex_id: { type: DataTypes.INTEGER, primaryKey: true },
    },
    {
      tableName: "treinos_exercicios",
      timestamps: false,
    }
  );

  return TreinoExercicio;
};
