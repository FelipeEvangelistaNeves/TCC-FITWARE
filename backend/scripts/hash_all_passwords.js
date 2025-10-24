// scripts/hash-all-passwords.js
require("dotenv").config();
const bcrypt = require("bcrypt");
const { Aluno, Funcionario, sequelize } = require("../models"); // ajuste o export dos seus models
const SALT_ROUNDS = 10;

function looksLikeBcrypt(hash) {
  // bcrypt hash costuma começar com $2[ayb]$ e ter comprimento ~60
  return typeof hash === "string" && /^\$2[aby]\$/.test(hash);
}

async function main() {
  console.log("Iniciando migração de senhas para bcrypt...");
  const transaction = await sequelize.transaction();
  try {
    // Alunos
    const alunos = await Aluno.findAll({ transaction });
    for (const a of alunos) {
      const senha = a.al_senha || "";
      if (!looksLikeBcrypt(senha) && senha.length > 0) {
        const newHash = await bcrypt.hash(senha, SALT_ROUNDS);
        a.al_senha = newHash;
        await a.save({ transaction });
        console.log(`Aluno id=${a.al_id} atualizado.`);
      }
    }

    // Funcionários (caso tenha senhas em tabela de funcionários)
    const funcionarios = await Funcionario.findAll({ transaction });
    for (const f of funcionarios) {
      const senha = f.fu_senha || "";
      if (!looksLikeBcrypt(senha) && senha.length > 0) {
        const newHash = await bcrypt.hash(senha, SALT_ROUNDS);
        f.fu_senha = newHash;
        await f.save({ transaction });
        console.log(`Funcionario id=${f.fu_id} atualizado.`);
      }
    }

    await transaction.commit();
    console.log("Migração concluída com sucesso.");
    process.exit(0);
  } catch (err) {
    await transaction.rollback();
    console.error("Erro na migração:", err);
    process.exit(1);
  }
}

main();
