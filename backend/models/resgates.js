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
        type: DataTypes.STRING(255),
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
      re_status: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      tableName: "resgates",
      timestamps: false,
    }
  );

  return Resgate;
};
