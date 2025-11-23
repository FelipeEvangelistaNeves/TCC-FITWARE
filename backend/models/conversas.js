module.exports = (sequelize, DataTypes) => {
  const Conversa = sequelize.define(
    "Conversa",
    {
      co_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      al_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "alunos", key: "al_id" },
      },
      prof_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "funcionarios", key: "fu_id" },
      },
    },
    {
      tableName: "conversas",
      timestamps: false,
    }
  );

  Conversa.associate = (models) => {
    Conversa.belongsTo(models.Funcionario, {
      foreignKey: "prof_id",
      as: "professor",
    });
  };

  return Conversa;
};
