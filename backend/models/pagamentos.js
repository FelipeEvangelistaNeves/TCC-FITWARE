module.exports = (sequelize, DataTypes) => {
  const Pagamento = sequelize.define(
    "Pagamento",
    {
      pa_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      pa_al_id: { type: DataTypes.INTEGER, allowNull: false },
      pa_valor: { type: DataTypes.DECIMAL(6, 2), allowNull: false },
      pa_metodo: { type: DataTypes.CHAR(1), allowNull: false },
      pa_status: { type: DataTypes.STRING(20), allowNull: false },
      pa_data: { type: DataTypes.DATEONLY, allowNull: false },
    },
    {
      tableName: "pagamentos",
      timestamps: false,
    }
  );

  return Pagamento;
};
