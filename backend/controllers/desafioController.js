const { parseMultipart } = require("../scripts/parse_multipart");
const { uploadBufferToS3 } = require("../scripts/upload_s3_img");
const { Desafio, DesafioImagem } = require("../models");
const LoggerMessages = require("../loggerMessages");

const dataDesafio = async () => {
  const Desafios = await Desafio.findAll({ order: [["de_end", "ASC"]] });
  return Desafios;
};

const updateDesafio = async (req, res) => {
  try {
    const id = req.params.id;
    const desafio = await Desafio.findByPk(id);
    if (!desafio)
      return res.status(404).json({ error: "Desafio não encontrado" });

    const {
      de_nome,
      de_descricao,
      de_pontos,
      de_tag,
      de_progresso,
      de_start,
      de_end,
      de_status,
    } = req.body;

    if (de_nome !== undefined) desafio.de_nome = de_nome;
    if (de_descricao !== undefined) desafio.de_descricao = de_descricao;
    if (de_pontos !== undefined) desafio.de_pontos = Number(de_pontos) || 0;
    if (de_tag !== undefined) desafio.de_tag = de_tag;
    if (de_progresso !== undefined)
      desafio.de_progresso = Number(de_progresso) || 0;
    if (de_start !== undefined) desafio.de_start = de_start;
    if (de_end !== undefined) desafio.de_end = de_end;
    if (de_status !== undefined) desafio.de_status = de_status;

    await desafio.save();

    return res.status(200).json({ message: "Desafio atualizado", desafio });
  } catch (error) {
    console.error("Erro ao atualizar desafio:", error);
    return res.status(500).json({ error: "Erro ao atualizar desafio" });
  }
};

const criarDesafio = async (req, res) => {
  try {
    const {
      de_nome,
      de_descricao,
      de_pontos,
      de_tag,
      de_progresso = 0,
      de_start,
      de_end,
      de_status = "Inativo",
    } = req.body;

    if (!de_nome)
      return res.status(400).json({ error: "Nome do desafio é obrigatório" });

    const novo = await Desafio.create({
      de_nome,
      de_descricao: de_descricao || null,
      de_pontos: Number(de_pontos) || 0,
      de_tag: de_tag || null,
      de_progresso: Number(de_progresso) || 0,
      de_start: de_start || null,
      de_end: de_end || null,
      de_status: de_status || "Inativo",
    });

    return res.status(201).json({ message: "Desafio criado", desafio: novo });
  } catch (error) {
    console.error("Erro ao criar desafio:", error);
    return res.status(500).json({ error: "Erro ao criar desafio" });
  }
};

const uploadImageDesafio = async (req, res) => {
  try {
    const { desafioId } = req.params;

    const desafio = await Desafio.findByPk(desafioId);
    if (!desafio) {
      return res.status(404).json({
        success: false,
        message: "Desafio não encontrado.",
      });
    }
    const { fields, file } = await parseMultipart(req);
    // verifica se o desafio existe

    if (!file) {
      return res.status(400).json({ error: "é obrigatório imagem do desafio" });
    }

    const { buffer, info } = file;

    const allowed = ["image/jpeg", "image/png"];
    if (!allowed.includes(info.mimeType)) {
      return res.status(400).json({ error: "somente JPG/PNG " });
    }

    const imageUrl = await uploadBufferToS3(buffer, info.mimeType, "desafios");

    const imagem = await DesafioImagem.create({
      di_aluno_id: req.user.id,
      di_desafio_id: desafioId,
      di_image_url: imageUrl,
    });

    return res.status(201).json({
      message: "imagem enviada com sucesso",
      imagem,
    });
  } catch (err) {
    console.error("Erro ao Salvar Imagem:", err);
    return res.status(500).json({ error: "erro no server" });
  }
};

const deletarDesafio = async (req, res) => {
  try {
    const id = req.params.id;
    const desafio = await Desafio.findByPk(id);
    if (!desafio)
      return res.status(404).json({ error: "Desafio não encontrado" });

    await desafio.destroy();
    return res.status(200).json({ message: "Desafio deletado" });
  } catch (error) {
    console.error("Erro ao deletar desafio:", error);
    return res.status(500).json({ error: "Erro ao deletar desafio" });
  }
};

module.exports = {
  dataDesafio,
  updateDesafio,
  criarDesafio,
  deletarDesafio,
  uploadImageDesafio,
};
