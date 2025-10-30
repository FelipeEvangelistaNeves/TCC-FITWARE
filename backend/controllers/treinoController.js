const jwt = require("jsonwebtoken");
const LoggerMessages = require("../loggerMessages");
const { Treino, Funcionario } = require("../models");

const dataTreinos = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token ausente. Faça login novamente." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const profId = decoded.id; // ID do prof que está logado

    const prof = await Funcionario.findByPk(profId, {
      attributes: { exclude: ["fu_senha"] },
    });

    if (!prof) {
      return res.status(404).json({ message: "Professor não encontrado." });
    }

    const treinos = await Treino.findByProfId(profId);

    return res.status(200).json(treinos);
  } catch (error) {
    console.error(LoggerMessages.TREINOS_FAILED, error);
    return res.status(500).json({ error: LoggerMessages.TREINOS_FAILED });
  }
};

module.exports = {
  dataTreinos,
};
