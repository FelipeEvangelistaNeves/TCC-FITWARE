module.exports = (sequelize, DataTypes) => {
  const Aviso = sequelize.define(
    "Aviso",
    {
      av_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      av_titulo: { type: DataTypes.STRING(100), allowNull: false },
      av_mensagem: { type: DataTypes.TEXT, allowNull: false },
      av_tipo: { type: DataTypes.STRING(30), allowNull: false },
      av_destinatario_tipo: { type: DataTypes.STRING(30), allowNull: false },
      av_data_inicio: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      av_data_fim: { type: DataTypes.DATE },
      av_ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
      av_data_criacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "avisos",
      timestamps: false,
    }
  );
  return Aviso;
}