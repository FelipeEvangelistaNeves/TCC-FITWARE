module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define(
    "Mensagem",
    {
      co_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      remetente_id: { type: DataTypes.INTEGER, allowNull: false },
      destinatario_id: { type: DataTypes.INTEGER, allowNull: false },
      me_conteudo: { type: DataTypes.TEXT, allowNull: false },
      me_tempo: { type: DataTypes.DATE, allowNull: false },
      me_lida: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      tableName: "mensagens",
      timestamps: false,
    }
  );

  return Mensagem;
};
