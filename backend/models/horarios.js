module.exports = (sequelize, DataTypes) => {
  const Horario = sequelize.define(
    "Horario",
    {
      hor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      hor_start: { type: DataTypes.TIME, allowNull: false },
      hor_end: { type: DataTypes.TIME, allowNull: false },
      hor_dia: { type: DataTypes.STRING(7), allowNull: false },
    },
    {
      tableName: "horarios",
      timestamps: false,
    }
  );

  return Horario;
};
