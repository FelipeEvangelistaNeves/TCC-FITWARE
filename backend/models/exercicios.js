module.exports = (sequelize, DataTypes) => {
  const Exercicio = sequelize.define(
    "Exercicio",
    {
      ex_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      ex_nome: { type: DataTypes.STRING(80), allowNull: false },
      ex_instrucao: { type: DataTypes.STRING(150) },
      ex_video: { type: DataTypes.STRING(300) },
      ex_grupo_muscular: { type: DataTypes.STRING(60) }, //colocar allowNull: false
      ex_dificuldade: { type: DataTypes.STRING(20) },
    },
    {
      tableName: "exercicios",
      timestamps: false,
    }
  );

  return Exercicio;
};
