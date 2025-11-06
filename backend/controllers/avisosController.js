const { Aviso } = require("../models");
const LoggerMessages = require("../loggerMessages");

/**
 * Cria um novo aviso
 */
const criarAviso = async (req, res) => {
  try {
    const {
      av_titulo,
      av_mensagem,
      av_tipo,
      av_destinatario_tipo,
      av_data_inicio,
      av_data_fim,
    } = req.body;

    // Exemplo: apenas Professor ou Secretário podem criar avisos
    if (req.user.role !== "Professor" && req.user.role !== "Secretario") {
      return res
        .status(403)
        .json({ message: "Apenas funcionários podem criar avisos." });
    }

    const novoAviso = await Aviso.create({
      av_titulo,
      av_mensagem,
      av_tipo,
      av_destinatario_tipo,
      av_data_inicio,
      av_data_fim,
      av_ativo: true,
    });

    res.status(201).json({
      success: true,
      message: "Aviso criado com sucesso.",
      aviso: novoAviso,
    });
  } catch (err) {
    console.error("Erro ao criar aviso:", err);
    res.status(500).json({ message: LoggerMessages.SERVER_ERROR });
  }
};

/**
 * Lista todos os avisos ativos, podendo filtrar por destinatário
 */
const listarAvisos = async (req, res) => {
  try {
    const { destinatario } = req.query;
    const filtro = { av_ativo: true };

    if (destinatario) {
      filtro.av_destinatario_tipo = destinatario;
    }

    const avisos = await Aviso.findAll({
      where: filtro,
      order: [["av_data_inicio", "DESC"]],
    });

    res.json({ success: true, avisos });
  } catch (err) {
    console.error("Erro ao listar avisos:", err);
    res.status(500).json({ message: LoggerMessages.SERVER_ERROR });
  }
};

/**
 * Busca um aviso específico por ID
 */
const buscarAvisoPorId = async (req, res) => {
  try {
    const aviso = await Aviso.findByPk(req.params.id);
    if (!aviso) {
      return res.status(404).json({ message: "Aviso não encontrado." });
    }
    res.json({ success: true, aviso });
  } catch (err) {
    console.error("Erro ao buscar aviso:", err);
    res.status(500).json({ message: LoggerMessages.SERVER_ERROR });
  }
};

/**
 * Atualiza um aviso existente
 */
const atualizarAviso = async (req, res) => {
  try {
    const aviso = await Aviso.findByPk(req.params.id);
    if (!aviso) {
      return res.status(404).json({ message: "Aviso não encontrado." });
    }

    // Somente funcionários podem editar
    if (req.user.role !== "Professor" && req.user.role !== "Secretario") {
      return res
        .status(403)
        .json({ message: "Apenas funcionários podem editar avisos." });
    }

    await aviso.update(req.body);

    res.json({
      success: true,
      message: "Aviso atualizado com sucesso.",
      aviso,
    });
  } catch (err) {
    console.error("Erro ao atualizar aviso:", err);
    res.status(500).json({ message: LoggerMessages.SERVER_ERROR });
  }
};

/**
 * Desativa (soft delete) um aviso
 */
const desativarAviso = async (req, res) => {
  try {
    const aviso = await Aviso.findByPk(req.params.id);
    if (!aviso) {
      return res.status(404).json({ message: "Aviso não encontrado." });
    }

    if (req.user.role !== "Professor" && req.user.role !== "Secretario") {
      return res
        .status(403)
        .json({ message: "Apenas funcionários podem remover avisos." });
    }

    await aviso.update({ av_ativo: false });
    res.json({ success: true, message: "Aviso desativado com sucesso." });
  } catch (err) {
    console.error("Erro ao desativar aviso:", err);
    res.status(500).json({ message: LoggerMessages.SERVER_ERROR });
  }
};

module.exports = {
  criarAviso,
  listarAvisos,
  buscarAvisoPorId,
  atualizarAviso,
  desativarAviso,
};
