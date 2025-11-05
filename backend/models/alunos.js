module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define(
    "Aluno",
    {
      al_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      al_nome: { type: DataTypes.STRING(120), allowNull: false },
      al_email: { type: DataTypes.STRING(120), allowNull: false },
      al_senha: { type: DataTypes.STRING(60), allowNull: false },
      al_cpf: { type: DataTypes.STRING(11), allowNull: false },
      al_telefone: { type: DataTypes.STRING(11) },
      al_dtnasc: { type: DataTypes.DATEONLY, allowNull: false },
      al_pontos: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "alunos",
      timestamps: false,
    }
  );

  return Aluno;
};
