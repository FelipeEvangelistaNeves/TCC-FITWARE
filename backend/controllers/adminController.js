const { Aluno } = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config({
  quiet: true,
});

criarAluno = async (req, res) => {
  try {
    const {
      al_nome,
      al_email,
      al_senha,
      al_cpf,
      al_telefone,
      al_dtnasc,
      al_pontos,
      al_treinos_completos,
      al_status,
    } = req.body;

    if (req.user.role !== "Secretario") {
      return res.status(403).json({
        message: "Apenas funcionários podem cadastrar alunos.",
      });
    }

    const senhaHash = await bcrypt.hash(al_senha, 10);

    const novoAluno = await Aluno.create({
      al_nome,
      al_email,
      al_senha: senhaHash,
      al_cpf,
      al_telefone,
      al_dtnasc,
      al_pontos,
      al_treinos_completos,
      al_status,
    });

    res.status(201).json({
      success: true,
      message: "Aluno criado com sucesso.",
      aluno: novoAluno,
    });
  } catch (err) {
    console.error("Erro ao criar aluno:", err);
    res.status(500).json({ message: "Erro no servidor." });
  }
};

atualizarAlunoAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    await Aluno.update(req.body, { where: { al_id: id } });

    res.json({ success: true, message: "Aluno atualizado." });
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar aluno." });
  }
};

deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;

    const removidos = await Aluno.destroy({ where: { al_id: id } });

    if (removidos === 0) {
      return res.status(404).json({
        success: false,
        message: "Aluno não encontrado.",
      });
    }

    res.json({ success: true, message: "Aluno deletado com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar aluno:", err);
    res.status(500).json({ message: "Erro ao deletar aluno." });
  }
};

listarAlunosAdmin = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token ausente. Faça login novamente." });
    }

    // usuários decodificados pelo middleware já estão em req.user
    if (!req.user || req.user.role !== "Secretario") {
      return res.status(403).json({
        message: "Apenas funcionários podem visualizar os alunos.",
      });
    }

    const alunos = await Aluno.findAll();

    if (!alunos || alunos.length === 0) {
      return res.status(404).json({ message: "Nenhum aluno encontrado" });
    }

    return res.json({
      success: true,
      alunos,
    });
  } catch (err) {
    console.error("Erro ao buscar dados dos alunos:", err);
    return res.status(500).json({
      message: "Erro ao buscar dados dos alunos.",
    });
  }
};

// ======================== //
// ===== CRUD EXERCÍCIOS ===== //
// ======================== //
const { Exercicio, TreinoExercicio } = require("../models");

atualizarExercicioAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { ex_nome, ex_instrucao, ex_grupo_muscular } = req.body;

    const exercicio = await Exercicio.findByPk(id);

    if (!exercicio) {
      return res.status(404).json({ error: "Exercício não encontrado" });
    }

    await exercicio.update({
      ex_nome: ex_nome || exercicio.ex_nome,
      ex_instrucao: ex_instrucao || exercicio.ex_instrucao,
      ex_grupo_muscular: ex_grupo_muscular || exercicio.ex_grupo_muscular,
    });

    return res.status(200).json({ message: "Exercício atualizado", exercicio });
  } catch (error) {
    console.error("Erro ao atualizar exercício:", error);
    return res.status(500).json({ error: "Erro ao atualizar exercício" });
  }
};

deletarExercicioAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const exercicio = await Exercicio.findByPk(id);

    if (!exercicio) {
      return res.status(404).json({ error: "Exercício não encontrado" });
    }

    // Remove associações em treinos_exercicios
    await TreinoExercicio.destroy({
      where: { ex_id: id },
    });

    // Remove o exercício
    await exercicio.destroy();

    return res.status(200).json({ message: "Exercício deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar exercício:", error);
    return res.status(500).json({ error: "Erro ao deletar exercício" });
  }
};

module.exports = {
  criarAluno,
  atualizarAlunoAdmin,
  deletarAluno,
  listarAlunosAdmin,
  atualizarExercicioAdmin,
  deletarExercicioAdmin,
};
