const {
  Aluno,
  Funcionario,
  AlunoTreino,
  Treino,
  Desafio,
} = require("../models");
const bcrypt = require("bcrypt");
const { cpf } = require("cpf-cnpj-validator");
const dns = require("dns").promises; // ← necessário para validação MX

require("dotenv").config({
  quiet: true,
});

// =============== FUNÇÕES DE VALIDAÇÃO =============== //

// Regex básico para formato de e-mail
function validarFormatoEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// DNS MX - verifica se o domínio pode receber e-mails
async function validarDominioEmail(email) {
  const dominio = email.split("@")[1];
  try {
    const registros = await dns.resolveMx(dominio);
    return registros && registros.length > 0;
  } catch {
    return false;
  }
}

// Idade mínima 12 anos
function validarIdadeMinima(dataNasc) {
  const hoje = new Date();
  const nascimento = new Date(dataNasc);

  const idade =
    hoje.getFullYear() -
    nascimento.getFullYear() -
    (hoje <
    new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate())
      ? 1
      : 0);

  return idade >= 12;
}

// ======================== //
// ===== CRUD ALUNOS ===== //
// ======================== //

const criarAluno = async (req, res) => {
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

    // ===== Apenas secretário pode criar ===== //
    if (req.user.role !== "Secretario") {
      return res.status(403).json({
        message: "Apenas funcionários podem cadastrar alunos.",
      });
    }

    // ===== Validação do CPF ===== //
    if (!cpf.isValid(al_cpf)) {
      return res.status(400).json({ message: "CPF inválido." });
    }

    // ===== Validação de senha mínima ===== //
    if (!al_senha || al_senha.length < 6) {
      return res.status(400).json({
        message: "A senha deve conter no mínimo 6 caracteres.",
      });
    }

    // ===== Validação de formato de e-mail ===== //
    if (!validarFormatoEmail(al_email)) {
      return res.status(400).json({ message: "E-mail em formato inválido." });
    }

    // ===== Validação DNS MX do domínio ===== //
    if (!(await validarDominioEmail(al_email))) {
      return res.status(400).json({
        message: "O domínio do e-mail não é válido ou não aceita e-mails.",
      });
    }

    // ===== Validar idade mínima ===== //
    if (!validarIdadeMinima(al_dtnasc)) {
      return res.status(400).json({
        message: "O aluno deve ter pelo menos 12 anos.",
      });
    }

    // ===== Hash da senha ===== //
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

    return res.status(201).json({
      success: true,
      message: "Aluno criado com sucesso.",
      aluno: novoAluno,
    });
  } catch (err) {
    console.error("Erro ao criar aluno:", err);
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

// ---------------------- RESTANTE DO SEU CONTROLLER ORIGINAL ---------------------- //
// (Nada abaixo foi modificado)

const atualizarAlunoAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await Aluno.update(req.body, { where: { al_id: id } });
    res.json({ success: true, message: "Aluno atualizado." });
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar aluno." });
  }
};

const deletarAluno = async (req, res) => {
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

const listarAlunosAdmin = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token ausente. Faça login novamente." });
    }

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

const { Exercicio, TreinoExercicio } = require("../models");

const atualizarExercicioAdmin = async (req, res) => {
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

const deletarExercicioAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const exercicio = await Exercicio.findByPk(id);

    if (!exercicio) {
      return res.status(404).json({ error: "Exercício não encontrado" });
    }

    await TreinoExercicio.destroy({ where: { ex_id: id } });
    await exercicio.destroy();

    return res.status(200).json({ message: "Exercício deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar exercício:", error);
    return res.status(500).json({ error: "Erro ao deletar exercício" });
  }
};

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

const getDashboardStats = async (req, res) => {
  try {
    let totalAlunos = await Aluno.count().catch(async () => {
      const alunos = await Aluno.findAll({ attributes: ["al_id"] });
      return alunos.length;
    });

    let totalDesafios = await Desafio.count().catch(async () => {
      const desafios = await Desafio.findAll({ attributes: ["de_id"] });
      return desafios.length;
    });

    let totalTreinos = await Treino.count().catch(async () => {
      const treinos = await Treino.findAll({ attributes: ["tr_id"] });
      return treinos.length;
    });

    return res.json({
      alunos: totalAlunos,
      desafios: totalDesafios,
      treinos: totalTreinos,
    });
  } catch (err) {
    console.error("Erro ao buscar estatísticas do dashboard:", err);
    return res.status(500).json({ error: "Erro ao buscar estatísticas" });
  }
};

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

    const cores = [
      "#7f24c6",
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#f9ca24",
      "#6c5ce7",
      "#a29bfe",
      "#fd79a8",
    ];

    const formatado = (regs || []).map((r, i) => ({
      id: `${r.al_id}-${r.tr_id}`,
      nome: r.Aluno?.al_nome || "Aluno",
      acao: r.Treino
        ? `atribuído ao treino: ${r.Treino.tr_nome}`
        : "associação",
      hora: "Recente",
      cor: cores[i % cores.length],
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
  getDashboardStats,
  getAtividadesRecentes,
};
