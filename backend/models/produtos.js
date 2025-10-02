module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define(
    "Produto",
    {
      pd_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      pd_nome: { type: DataTypes.STRING(120), allowNull: false },
      pd_valor: { type: DataTypes.INTEGER, allowNull: false },
      pd_descricao: { type: DataTypes.STRING(200) },
    },
    {
      tableName: "produtos",
      timestamps: false,
    }
  );

  return Produto;
};
