module.exports = (sequelize, DataTypes) => {
  const Funcionario = sequelize.define(
    "Funcionario",
    {
      fu_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      fu_nome: { type: DataTypes.STRING(120), allowNull: false },
      fu_email: { type: DataTypes.STRING(120), allowNull: false },
      fu_senha: { type: DataTypes.STRING(60), allowNull: false },
      fu_cpf: { type: DataTypes.STRING(11), allowNull: false },
      fu_telefone: { type: DataTypes.STRING(11), allowNull: false },
      fu_dtnasc: { type: DataTypes.DATEONLY, allowNull: false },
      fu_cargo: { type: DataTypes.STRING(50), allowNull: false },
      fu_cref: { type: DataTypes.STRING(13) },
    },
    {
      tableName: "funcionarios",
      timestamps: false,
    }
  );

  Funcionario.findByEmail = async function (email) {
    return await Funcionario.findOne({ where: { fu_email: email } });
  };

  return Funcionario;
};
