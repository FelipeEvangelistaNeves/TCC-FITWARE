// controllers/professorController.js
const {
  Aluno,
  Funcionario,
  Conversa,
  Mensagem,
  AlunoTreino,
  Treino,
  Exercicio,
  TreinoExercicio,
  Turma,
  Aviso,
} = require("../models");
const LoggerMessages = require("../loggerMessages");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  quiet: true,
});

const loginProfessor = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e password são obrigatórios.",
      });
    }

    // Busca o funcionário pelo e-mail (Sequelize)
    const funcionario = await Funcionario.findOne({
      where: { fu_email: email },
    });

    if (!funcionario) {
      return res
        .status(401)
        .json({ success: false, message: LoggerMessages.USER_NOT_FOUND });
    }

    // Verifica cargo (só Professor pode logar por essa rota)
    if (funcionario.fu_cargo !== "Professor") {
      return res.status(403).json({
        success: false,
        message: LoggerMessages.ROLE_ERROR || "Acesso negado",
      });
    }

    // Compara senha (assume que fu_senha é hash bcrypt — se não for, ver fallback temporário)
    const senhaValida = await bcrypt.compare(password, funcionario.fu_senha);
    if (!senhaValida) {
      return res
        .status(401)
        .json({ success: false, message: LoggerMessages.LOGIN_FAILED });
    }

    // Gerar JWT com id e role
    const token = jwt.sign(
      { id: funcionario.fu_id, role: funcionario.fu_cargo },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1h" }
    );

    // Envia token como cookie HTTP-only
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    // Retorna dados públicos do usuário
    return res.json({
      success: true,
      message: LoggerMessages.LOGIN_SUCESS || "Login realizado com sucesso",
      user: {
        id: funcionario.fu_id,
        nome: funcionario.fu_nome,
        email: funcionario.fu_email,
        role: funcionario.fu_cargo,
      },
    });
  } catch (err) {
    console.error("Erro loginProfessor:", err);
    return res.status(500).json({
      success: false,
      message: LoggerMessages.SERVER_ERROR || "Erro no servidor",
    });
  }
};

/**
 * 🔹 Buscar dados do professor logado (pelo token)
 */
const dataProfessor = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token ausente. Faça login novamente." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const professorId = decoded.id;

    const professor = await Funcionario.findByPk(professorId, {
      attributes: { exclude: ["fu_senha"] },
    });

    if (!professor) {
      return res.status(404).json({ message: "Funcionário não encontrado." });
    }

    const nomeProfessor = professor.fu_nome || "";
    const [firstName, lastName] = nomeProfessor.split(" ");
    const iniciais =
      (firstName ? firstName[0] : "") + (lastName ? lastName[0] : "");

    res.json({
      nome: professor.fu_nome,
      email: professor.fu_email,
      cargo: professor.fu_cargo,
      cpf: professor.fu_cpf,
      telefone: professor.fu_telefone,
      cref: professor.fu_cref,
      iniciais,
    });
  } catch (err) {
    console.error("Erro ao buscar dados do funcionário:", err);
    return res
      .status(500)
      .json({ message: "Erro ao buscar dados do funcionário." });
  }
};

/**
 * 🔹 Atualizar informações do professor logado
 */
const atualizarProfessor = async (req, res) => {
  try {
    const professorId = req.user.id; // vem do verifyToken
    const { nome, email, telefone, cargo } = req.body;

    if (!nome || !email) {
      return res.status(400).json({
        success: false,
        message: "Preencha todos os campos obrigatórios.",
      });
    }

    const funcionario = await Funcionario.findByPk(professorId);
    if (!funcionario) {
      return res
        .status(404)
        .json({ success: false, message: "Funcionário não encontrado." });
    }

    funcionario.fu_nome = nome;
    funcionario.fu_email = email;
    funcionario.fu_telefone = telefone || funcionario.fu_telefone;
    funcionario.fu_cargo = cargo || funcionario.fu_cargo;

    await funcionario.save();

    res.json({
      success: true,
      message: "Dados atualizados com sucesso!",
      funcionario: {
        id: funcionario.fu_id,
        nome: funcionario.fu_nome,
        email: funcionario.fu_email,
        telefone: funcionario.fu_telefone,
        cargo: funcionario.fu_cargo,
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar funcionário:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno ao atualizar dados." });
  }
};

const dataProfAlunos = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token ausente. Faça login novamente." });
    }

    const alunos = await Aluno.findAll({
      attributes: [
        "al_id",
        "al_nome",
        "al_email",
        "al_telefone",
        "al_pontos",
        "al_status",
        "al_treinos_completos",
      ],
    });

    if (alunos.length === 0) {
      return res.status(404).json({ message: "Nenhum aluno encontrado" });
    }

    res.json({
      alunos,
    });
  } catch (err) {
    console.error("Erro ao buscar dados dos alunos:", err);
    return res
      .status(500)
      .json({ message: "Erro ao buscar dados dos alunos." });
  }
};

const dataProfConversas = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token ausente. Faça login novamente." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const professorId = decoded.id;

    // Busca todas as conversas onde o professor participa
    const conversas = await Conversa.findAll({
      where: { prof_id: professorId },
      include: [
        {
          model: Aluno,
          attributes: [
            "al_id",
            "al_nome",
            "al_email",
            "al_telefone",
            "al_pontos",
          ],
        },
      ],
      order: [["co_id", "DESC"]],
    });

    res.json({ conversas });
  } catch (err) {
    console.error("Erro ao buscar dados de conversas:", err);
    return res
      .status(500)
      .json({ message: "Erro ao buscar dados de conversas." });
  }
};

const dataProfMensagens = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token ausente. Faça login novamente." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const professorId = decoded.id;

    // ID da conversa vindo da rota
    const conversaId = req.params.id;

    if (!conversaId) {
      return res.status(400).json({ message: "ID da conversa é obrigatório." });
    }

    // Verificar se a conversa pertence a este professor
    const conversa = await Conversa.findOne({
      where: { co_id: conversaId, prof_id: professorId },
    });

    if (!conversa) {
      return res
        .status(403)
        .json({ message: "Acesso negado a esta conversa." });
    }

    // Buscar mensagens relacionadas a esta conversa
    const mensagens = await Mensagem.findAll({
      where: { co_id: conversaId },
      order: [["me_tempo", "ASC"]], // ordem natural de chat
    });

    res.json({ mensagens });
  } catch (err) {
    console.error("Erro ao buscar mensagens da conversa:", err);
    return res.status(500).json({
      message: "Erro ao buscar mensagens da conversa.",
    });
  }
};

const enviarMensagemProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const { conteudo } = req.body;

    if (!conteudo || conteudo.trim() === "") {
      return res.status(400).json({ message: "Mensagem vazia." });
    }

    // Token
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Token ausente." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const professorId = decoded.id;

    // Verificar se a conversa existe e pertence ao professor
    const conversa = await Conversa.findOne({
      where: { co_id: id },
      attributes: ["co_id", "al_id", "prof_id"],
    });

    if (!conversa) {
      return res.status(404).json({ message: "Conversa não encontrada." });
    }

    if (conversa.prof_id !== professorId) {
      return res
        .status(403)
        .json({ message: "Você não pertence a esta conversa." });
    }

    // Criar mensagem
    const novaMensagem = await Mensagem.create({
      co_id: id,
      remetente_id: professorId,
      remetente_tipo: "professor",
      destinatario_id: conversa.al_id,
      destinatario_tipo: "aluno",
      me_conteudo: conteudo,
      me_tempo: new Date(),
      me_lida: false,
    });

    return res.json({ message: "Mensagem enviada.", novaMensagem });
  } catch (err) {
    console.error("Erro ao enviar mensagem do professor:", err);
    return res.status(500).json({ message: "Erro ao enviar mensagem." });
  }
};

const dataProfTreinosAluno = async (req, res) => {
  try {
    const { al_id } = req.params;

    console.log("🔍 ID recebido no controller:", req.params.al_id);

    const countTreinos = await AlunoTreino.count({
  where: { al_id }
});

console.log("🔍 Quantos treinos esse aluno tem na pivot:", countTreinos);
    const treinosAluno = await AlunoTreino.findAll({
    where: { al_id },
    include: [
      {
        model: Treino,
        as: "Treino",
        include: [
          {
            model: Exercicio,
            as: "Exercicios"   // importante: seu Treino→Exercicio também usa alias
          }
        ]
      }
    ]
  });

  console.log("🔍 Resultado raw do banco:", JSON.stringify(treinosAluno, null, 2));
    res.json({ treinosAluno });
  } catch (err) {
    console.error("Erro ao buscar treinos do aluno:", err);
    res.status(500).json({ message: "Erro ao buscar treinos do aluno" });
  }
};

const dataProfDashboard = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Token ausente" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const professorId = decoded.id;

    // Treinos criados pelo professor
    const totalTreinos = await Treino.count({
      where: { tr_prof_id: professorId }
    });

    // Turmas que ele ministra
    const totalTurmas = await Turma.count({
      where: { tu_prof_id: professorId }
    });

    return res.json({
      totalTreinos,
      totalTurmas,
    });

  } catch (err) {
    console.error("Erro ao buscar dados do dashboard:", err);
    return res.status(500).json({ message: "Erro interno." });
  }
};

const dataProfUltimosAvisos = async (req, res) => {
  try {
    const avisos = await Aviso.findAll({
      where: {
        av_destinatario_tipo: "Professores",
        av_ativo: true
      },
      order: [["av_data_criacao", "DESC"]],
      limit: 5
    });

    res.json({ avisos });

  } catch (err) {
    console.error("Erro ao buscar avisos:", err);
    res.status(500).json({ message: "Erro ao buscar avisos." });
  }
};

//////////////////////////////////////////
// CRUD Professor (Admin) - pode ser movido futuramente
//////////////////////////////////////////

/* ---- LISTAR TODOS OS PROFESSORES (TABELA) ---- */

const listarProfessores = async (req, res) => {
  try {
    const professores = await Funcionario.findAll({
      where: { fu_cargo: "Professor" },
      attributes: [
        "fu_id",
        "fu_nome",
        "fu_email",
        "fu_telefone",
        "fu_cref",
        "fu_cpf",
        "fu_dtnasc",
      ],
    });

    res.json(professores);
  } catch (err) {
    console.error("Erro listarProfessores:", err);
    res.status(500).json({ message: "Erro ao listar professores." });
  }
};

/* ---- CRIAR PROFESSOR ---- */
const criarProfessor = async (req, res) => {
  try {
    const {
      fu_nome,
      fu_email,
      fu_senha,
      fu_cpf,
      fu_telefone,
      fu_cref,
      fu_dtnasc,
    } = req.body;

    if (!fu_nome || !fu_email || !fu_senha) {
      return res
        .status(400)
        .json({ message: "Nome, email e senha são obrigatórios." });
    }

    const senhaHash = await bcrypt.hash(fu_senha, 10);

    const novo = await Funcionario.create({
      fu_nome: fu_nome,
      fu_email: fu_email,
      fu_senha: senhaHash,
      fu_cpf: fu_cpf,
      fu_telefone: fu_telefone,
      fu_cref: fu_cref,
      fu_cargo: "Professor",
      fu_dtnasc: fu_dtnasc,
    });

    res.json({ success: true, professor: novo });
  } catch (err) {
    console.error("Erro criarProfessor:", err);
    res.status(500).json({ message: "Erro ao criar professor." });
  }
};

/* ---- EDITAR PROFESSOR ---- */
const editarProfessor = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;

  try {
    const professor = await Funcionario.findByPk(id);

    if (!professor) {
      return res.status(404).json({ message: "Professor não encontrado" });
    }

    await professor.update(dados);

    return res.json({
      message: "Professor atualizado com sucesso",
      professor,
    });
  } catch (err) {
    console.error("Erro ao atualizar professor:", err);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

/* ---- DELETAR PROFESSOR ---- */
const deletarProfessor = async (req, res) => {
  try {
    const { id } = req.params;

    const professor = await Funcionario.findByPk(id);
    if (!professor)
      return res.status(404).json({ message: "Professor não encontrado." });

    await professor.destroy();

    res.json({ success: true, message: "Professor removido." });
  } catch (err) {
    console.error("Erro deletarProfessor:", err);
    res.status(500).json({ message: "Erro ao deletar professor." });
  }
};

module.exports = {
  loginProfessor,
  dataProfessor,
  atualizarProfessor,
  dataProfAlunos,
  dataProfConversas,
  dataProfMensagens,
  enviarMensagemProfessor,
  dataProfTreinosAluno,
  dataProfDashboard,
  dataProfUltimosAvisos,
  listarProfessores,
  criarProfessor,
  editarProfessor,
  deletarProfessor,
};
