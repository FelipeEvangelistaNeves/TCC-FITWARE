module.exports = (sequelize, DataTypes) => {
  const Modalidade = sequelize.define(
    "Modalidade",
    {
      mo_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      mo_nome: { type: DataTypes.STRING(30), allowNull: false },
      mo_descricao: { type: DataTypes.STRING(200) },
    },
    {
      tableName: "modalidades",
      timestamps: false,
    }
  );

  return Modalidade;
};
