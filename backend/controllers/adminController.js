const {
  Aluno,
  Funcionario,
  AlunoTreino,
  Treino,
  Desafio,
} = require("../models");
const bcrypt = require("bcrypt");
const { cpf } = require("cpf-cnpj-validator");

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

    if (!cpf.isValid(al_cpf)) {
      return res.status(400).json({ message: "CPF inválido." });
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

// ======= Perfil do Admin (Secretario) =======
const getAdminProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const func = await Funcionario.findByPk(userId, {
      attributes: [
        "fu_id",
        "fu_nome",
        "fu_email",
        "fu_cpf",
        "fu_telefone",
        "fu_dtnasc",
        "fu_cargo",
        "fu_cref",
      ],
    });

    if (!func)
      return res.status(404).json({ error: "Funcionário não encontrado" });

    return res.json(func);
  } catch (err) {
    console.error("Erro ao buscar perfil do admin:", err);
    return res.status(500).json({ error: "Erro ao buscar perfil" });
  }
};

const updateAdminProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const func = await Funcionario.findByPk(userId);
    if (!func)
      return res.status(404).json({ error: "Funcionário não encontrado" });

    const { nome, email, senha, cpf, telefone, dtNasc, cref } = req.body;

    if (nome !== undefined) func.fu_nome = nome;
    if (email !== undefined) func.fu_email = email;
    if (cpf !== undefined) func.fu_cpf = cpf;
    if (telefone !== undefined) func.fu_telefone = telefone;
    if (dtNasc !== undefined) func.fu_dtnasc = dtNasc;
    if (cref !== undefined) func.fu_cref = cref;

    if (senha) {
      const hash = await bcrypt.hash(senha, 10);
      func.fu_senha = hash;
    }

    await func.save();

    // return updated public fields
    const updated = {
      fu_id: func.fu_id,
      fu_nome: func.fu_nome,
      fu_email: func.fu_email,
      fu_cpf: func.fu_cpf,
      fu_telefone: func.fu_telefone,
      fu_dtnasc: func.fu_dtnasc,
      fu_cargo: func.fu_cargo,
      fu_cref: func.fu_cref,
    };

    return res.json({ message: "Perfil atualizado", funcionario: updated });
  } catch (err) {
    console.error("Erro ao atualizar perfil do admin:", err);
    return res.status(500).json({ error: "Erro ao atualizar perfil" });
  }
};
// ======================== //

// ======= Dashboard Estatísticas =======
const getTotalAlunos = async (req, res) => {
  try {
    // Tenta contar apenas alunos com status 'Ativo' (mais útil para dashboard)
    try {
      const total = await Aluno.count({ where: { al_status: "Ativo" } });
      return res.json({ total });
    } catch (innerErr) {
      // Se count falhar por algum motivo (ex: dialect mismatch), tenta buscar
      // todos e filtrar em memória como fallback seguro.
      console.warn(
        "Fallback: erro ao usar count(), tentando buscar e filtrar:",
        innerErr
      );
      const alunos = await Aluno.findAll({ attributes: ["al_status"] });
      const total = (alunos || []).filter(
        (a) => a.al_status === "Ativo"
      ).length;
      return res.json({ total });
    }
  } catch (err) {
    console.error("Erro ao contar alunos:", err);
    return res.status(500).json({ error: "Erro ao buscar total de alunos" });
  }
};

const getTotalDesafios = async (req, res) => {
  try {
    const total = await Desafio.count();
    return res.json({ total });
  } catch (err) {
    console.error("Erro ao contar desafios:", err);
    return res.status(500).json({ error: "Erro ao buscar total de desafios" });
  }
};

// Gera atividades recentes a partir das associações existentes (sem alterar o banco).
// Usa `AlunoTreino` para montar uma lista das últimas atribuições/associações
// (ordenamos por al_id/tr_id como aproximação de recência, já que não há timestamps).
const getAtividadesRecentes = async (req, res) => {
  try {
    const regs = await AlunoTreino.findAll({
      limit: 10,
      order: [["al_id", "DESC"]],
      include: [
        { model: Aluno, as: "Aluno", attributes: ["al_nome"] },
        { model: Treino, as: "Treino", attributes: ["tr_nome"] },
      ],
    });

    const formatado = (regs || []).map((r) => ({
      id: `${r.al_id}-${r.tr_id}`,
      nome: r.Aluno?.al_nome || "Aluno",
      acao: r.Treino
        ? `atribuído ao treino: ${r.Treino.tr_nome}`
        : "associação",
      hora: null,
    }));

    return res.json({ atividades: formatado });
  } catch (err) {
    console.error("Erro ao buscar atividades:", err);
    return res.status(500).json({ error: "Erro ao buscar atividades" });
  }
};

module.exports = {
  criarAluno,
  atualizarAlunoAdmin,
  deletarAluno,
  listarAlunosAdmin,
  atualizarExercicioAdmin,
  deletarExercicioAdmin,
  getAdminProfile,
  updateAdminProfile,
  getTotalAlunos,
  getTotalDesafios,
  getAtividadesRecentes,
};
