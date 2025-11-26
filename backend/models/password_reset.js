module.exports = (sequelize, DataTypes) => {
  const PasswordReset = sequelize.define(
    "PasswordReset",
    {
      pr_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pr_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pr_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pr_expira: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      pr_usado: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
      },
    },
    {
      tableName: "password_reset",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );
  return PasswordReset;
};
