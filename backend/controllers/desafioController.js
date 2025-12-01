const { parseMultipart } = require("../scripts/parse_multipart");
const { uploadBufferToS3 } = require("../scripts/upload_s3_img");
const {
  Desafio,
  DesafioImagem,
  AlunoDesafio,
  Aluno,
  sequelize,
} = require("../models");
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
      de_start,
      de_end,
      de_status,
    } = req.body;

    if (de_nome !== undefined) desafio.de_nome = de_nome;
    if (de_descricao !== undefined) desafio.de_descricao = de_descricao;
    if (de_pontos !== undefined) desafio.de_pontos = Number(de_pontos) || 0;
    if (de_tag !== undefined) desafio.de_tag = de_tag;
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

// Aplicar (inscrever) um aluno em um desafio
const aplicarDesafio = async (req, res) => {
  const alunoId = req.user && req.user.id;
  const desafioId = req.params.id;

  if (!alunoId)
    return res.status(401).json({ error: "Usuário não autenticado" });

  const t = await sequelize.transaction();

  try {
    const desafio = await Desafio.findByPk(desafioId, { transaction: t });
    if (!desafio) {
      await t.rollback();
      return res.status(404).json({ error: "Desafio não encontrado" });
    }

    // previne duplicatas
    const exists = await AlunoDesafio.findOne({
      where: { al_id: alunoId, de_id: desafioId },
      transaction: t,
    });

    if (exists) {
      // se já existe, se estiver inativo, ativa; se já ativo, retorna erro
      if (String(exists.ad_status).toLowerCase() === "ativo") {
        await t.rollback();
        return res
          .status(400)
          .json({ error: "Aluno já aplicou para este desafio" });
      }
      exists.ad_status = "ativo";
      await exists.save({ transaction: t });
      await t.commit();
      return res.status(200).json({ message: "Desafio aplicado (reativado)" });
    }

    await AlunoDesafio.create(
      {
        al_id: alunoId,
        de_id: desafioId,
        ad_status: "ativo",
      },
      { transaction: t }
    );

    await t.commit();
    return res.status(201).json({ message: "Desafio aplicado com sucesso" });
  } catch (error) {
    await t.rollback();
    console.error("Erro ao aplicar desafio:", error);
    return res.status(500).json({ error: "Erro ao aplicar desafio" });
  }
};

// Retorna desafios (aplicados) do aluno atual
const meusDesafios = async (req, res) => {
  try {
    const alunoId = req.user && req.user.id;
    if (!alunoId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const registros = await AlunoDesafio.findAll({
      where: { al_id: alunoId },
      attributes: ["de_id", "ad_status", "ad_progresso"],
    });

    return res.status(200).json(registros);
  } catch (error) {
    console.error("Erro ao buscar desafios do aluno:", error);
    return res.status(500).json({ error: "Erro ao buscar desafios do aluno" });
  }
};

// 🔹 Listar alunos aplicados em um desafio (admin)
const listarAlunosDoDesafio = async (req, res) => {
  try {
    const desafioId = req.params.id;

    const desafio = await Desafio.findOne({
      where: { de_id: desafioId },
      include: [
        {
          model: Aluno,
          attributes: ["al_id", "al_nome", "al_email"],
          through: { attributes: ["ad_status", "ad_progresso"] },
        },
      ],
    });

    if (!desafio)
      return res.status(404).json({ error: "Desafio não encontrado" });

    const alunos = (desafio.Alunos || []).map((a) => ({
      al_id: a.al_id,
      al_nome: a.al_nome,
      al_email: a.al_email,
      ad_status: a.AlunoDesafio?.ad_status ?? null,
      ad_progresso: a.AlunoDesafio?.ad_progresso ?? 0,
    }));

    return res
      .status(200)
      .json({ desafio: { id: desafio.de_id, nome: desafio.de_nome }, alunos });
  } catch (error) {
    console.error("Erro ao listar alunos do desafio:", error);
    return res.status(500).json({ error: "Erro ao listar alunos do desafio" });
  }
};

// 🔹 Atualizar progresso / status do aluno em um desafio (admin)
const atualizarProgressoAluno = async (req, res) => {
  const desafioId = req.params.desafioId;
  const alunoId = req.params.alunoId;
  const { ad_progresso } = req.body;

  if (ad_progresso === undefined || ad_progresso === null)
    return res.status(400).json({ error: "ad_progresso é obrigatório" });

  const progresso = Number(ad_progresso);
  if (isNaN(progresso) || progresso < 0 || progresso > 100)
    return res
      .status(400)
      .json({ error: "ad_progresso deve ser um número entre 0 e 100" });

  const t = await sequelize.transaction();
  try {
    const registro = await AlunoDesafio.findOne({
      where: { al_id: alunoId, de_id: desafioId },
      transaction: t,
    });

    if (!registro) {
      await t.rollback();
      return res
        .status(404)
        .json({ error: "Registro aluno-desafio não encontrado" });
    }

    const previousStatus = String(registro.ad_status || "").toLowerCase();
    const previousProgress = Number(registro.ad_progresso || 0);

    registro.ad_progresso = progresso;
    if (progresso >= 100) registro.ad_status = "concluido";
    else if (progresso > 0) registro.ad_status = "ativo";

    await registro.save({ transaction: t });

    // If we just transitioned to 'concluido' from a non-concluido state,
    // award the aluno the points for the desafio (only once).
    const newStatus = String(registro.ad_status || "").toLowerCase();
    if (newStatus === "concluido" && previousStatus !== "concluido") {
      // load desafio points and aluno
      const desafio = await Desafio.findByPk(desafioId, { transaction: t });
      const aluno = await Aluno.findByPk(alunoId, { transaction: t });

      if (desafio && aluno) {
        const adicionar = Number(desafio.de_pontos) || 0;
        // only award if adicionar > 0
        if (adicionar > 0) {
          aluno.al_pontos = Number(aluno.al_pontos || 0) + adicionar;
          await aluno.save({ transaction: t });
        }
      }
    }
    await t.commit();

    return res.status(200).json({ message: "Progresso atualizado", registro });
  } catch (error) {
    await t.rollback();
    console.error("Erro ao atualizar progresso do aluno:", error);
    return res
      .status(500)
      .json({ error: "Erro ao atualizar progresso do aluno" });
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
  aplicarDesafio,
  meusDesafios,
  listarAlunosDoDesafio,
  atualizarProgressoAluno,
  deletarDesafio,
  uploadImageDesafio,
};
