const { Sequelize, DataTypes } = require("sequelize");

// conexão com o banco
const sequelize = new Sequelize("fitwaredb", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
  logging: false, // deixe true se quiser ver as queries no console
});

// importa o model Aluno
const { Aluno, Funcionario } = require("../models/");

// adiciona método customizado
Aluno.findOneByEmail = async function (email) {
  return await Aluno.findOne({ where: { al_email: email } });
};

Funcionario.findOneByEmail = async function (email) {
  return await Funcionario.findOne({ where: { fu_email: email } });
};

(async () => {
  try {
    // testa conexão
    await sequelize.authenticate();
    console.log("✅ Conexão com o banco estabelecida!");

    // busca um aluno pelo email
    const emailTeste = "joao@email.com"; // coloque um email que exista no banco
    const aluno = await Aluno.findOneByEmail(emailTeste);

    const fitwareTeste = "fernanda@fitware.com";
    const funcionario = await Funcionario.findOneByEmail(fitwareTeste);

    if (funcionario) {
      console.log("📌 Funcionário encontrado:");
      console.log(funcionario.toJSON());
    } else {
      console.log(
        "⚠️ Nenhum funcionário encontrado com esse email:",
        fitwareTeste
      );
    }

    if (aluno) {
      console.log("📌 Aluno encontrado:");
      console.log(aluno.toJSON());
    } else {
      console.log("⚠️ Nenhum aluno encontrado com esse email:", emailTeste);
    }

    await sequelize.close();
  } catch (err) {
    console.error("❌ Erro ao conectar/testar:", err);
  }
})();
