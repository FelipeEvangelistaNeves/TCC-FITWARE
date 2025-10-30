module.exports = (sequelize, DataTypes) => {
  const Treino = sequelize.define(
    "Treino",
    {
      tr_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      tr_prof_id: { type: DataTypes.INTEGER, allowNull: false },
      tr_nome: { type: DataTypes.STRING(80), allowNull: false },
      tr_descricao: { type: DataTypes.STRING(150) },
      tr_dificuldade: { type: DataTypes.STRING(20) },
    },
    {
      tableName: "treinos",
      timestamps: false,
    }
  );

  return Treino;
};
