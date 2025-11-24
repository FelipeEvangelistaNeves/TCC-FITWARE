module.exports = (sequelize, DataTypes) => {
  const DesafioImagem = sequelize.define(
    "DesafioImagem",
    {
      di_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      di_aluno_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      di_desafio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      di_image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      di_created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      di_updated_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "desafios_imagem",
      timestamps: true,
      createdAt: "di_created_at",
      updatedAt: "di_updated_at",
    }
  );

  DesafioImagem.associate = (models) => {
    // DesafioImagem → Aluno (N:1)
    DesafioImagem.belongsTo(models.Aluno, {
      foreignKey: "di_aluno_id",
      onDelete: "CASCADE",
    });

    DesafioImagem.belongsTo(models.Desafio, {
      foreignKey: "di_desafio_id",
      onDelete: "CASCADE",
    });
  };

  return DesafioImagem;
};
