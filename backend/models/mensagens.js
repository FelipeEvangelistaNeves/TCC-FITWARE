module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define(
    "Mensagem",
    {
      co_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      al_id: { type: DataTypes.INTEGER, allowNull: false },
      prof_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "mensagens",
      timestamps: false,
    }
  );
  
  return Mensagem;
};