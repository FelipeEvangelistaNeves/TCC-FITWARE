module.exports = (sequelize, DataTypes) => {
  const AlunoDesafio = sequelize.define(
    "AlunoDesafio",
    {
      al_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: "alunos", key: "al_id" },
        allowNull: false,
      },
      de_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: "desafios", key: "de_id" },
        allowNull: false,
      },
      ad_status: {
        // ad_status stores string status values like 'ativo', 'concluido', etc.
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "inativo",
      },
      ad_progresso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    },
    {
      tableName: "alunos_desafios",
      timestamps: false,
    }
  );

  return AlunoDesafio;
};
