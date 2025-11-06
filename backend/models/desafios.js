module.exports = (sequelize, DataTypes) => {
  const Desafio = sequelize.define(
    "Desafio",
    {
      de_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      de_nome: { type: DataTypes.STRING(80), allowNull: false },
      de_descricao: { type: DataTypes.STRING(150) },
      de_pontos: { type: DataTypes.INTEGER, allowNull: false },
      de_tag: { type: DataTypes.STRING(60), allowNull: false },
      de_progresso: { type: DataTypes.INTEGER, allowNull: false },
      de_start: { type: DataTypes.DATE, allowNull: false },
      de_end: { type: DataTypes.DATE, allowNull: false },
      de_status: { type: DataTypes.STRING(15), allowNull: false },
    },
    {
      tableName: "desafios",
      timestamps: false,
    }
  );

  return Desafio;
};
