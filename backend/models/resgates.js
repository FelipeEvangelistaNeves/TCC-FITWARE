module.exports = (sequelize, DataTypes) => {
  const Resgate = sequelize.define(
    "Resgate",
    {
      re_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      al_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pd_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      re_hash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      re_preco: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      re_data: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "resgates",
      timestamps: false,
    }
  );

  return Resgate;
};
