module.exports = (sequelize, DataTypes) => {
  const Turma = sequelize.define(
    "Turma",
    {
      tu_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      tu_nome: { type: DataTypes.STRING(50), allowNull: false },
      tu_prof_id: { type: DataTypes.INTEGER, allowNull: false },
      tu_mod_id: { type: DataTypes.INTEGER, allowNull: false },
      tu_hor_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "turmas",
      timestamps: false,
    }
  );

  return Turma;
};
