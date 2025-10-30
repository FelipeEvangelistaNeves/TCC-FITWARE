const { Sequelize, DataTypes } = require("sequelize");

// conexão com o banco
const sequelize = new Sequelize("fitwaredb", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
  logging: false, // deixe true se quiser ver as queries no console
});

// importa o model Aluno
const { Aluno, Funcionario, Treino } = require("../models/");

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
    const aluno = await Aluno.findAll();

    const fitwareTeste = "fernanda@fitware.com";
    const funcionario = await Funcionario.findOneByEmail(fitwareTeste);

    const treino = await Treino.findByProfId(funcionario.fu_id); // substitua 1 pelo ID de um professor existente

    if (funcionario) {
      console.log("📌 Funcionário encontrado:");
      console.log(funcionario.fu_id);
    } else {
      console.log(
        "⚠️ Nenhum funcionário encontrado com esse email:",
        fitwareTeste
      );
    }

    if (aluno) {
      console.log("📌 Aluno encontrado:");
      console.log(aluno);
    } else {
      console.log("⚠️ Nenhum aluno encontrado com esse email:", emailTeste);
    }

    if (treino) {
      console.log("📌 Treino encontrado:");
      console.log(treino);
    } else {
      console.log(
        "⚠️ Nenhum treino encontrado com esse id:",
        funcionario.fu_id
      );
    }
    await sequelize.close();
  } catch (err) {
    console.error("❌ Erro ao conectar/testar:", err);
  }
})();
