const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { PasswordReset, Aluno, Funcionario } = require("../models");
const { enviarEmail } = require("../scripts/email.js");

const findUserByEmail = async (email) => {
  let user =
    (await Aluno.findOne({ where: { al_email: email } })) ||
    (await Funcionario.findOne({ where: { fu_email: email } }));

  return user;
};

const solicitarReset = async (req, res) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ error: "E-mail não encontrado." });

  const token = crypto.randomBytes(32).toString("hex");
  const expira = new Date(Date.now() + 3600 * 1000); // expira em 1 hora

  await PasswordReset.create({
    pr_email: email,
    pr_token: token,
    pr_expira: expira,
  });

  // link do reset
  const link = `${process.env.FRONT_URL}/resetar-senha/${token}`;

  enviarEmail(
    email,
    "Redefinição de Senha",
    `Clique no link para redefinir sua senha: ${link}`
  );

  return res.json({ message: "E-mail enviado com sucesso!" });
};

// 2) Validar token
const validarToken = async (req, res) => {
  const { token } = req.params;

  const reset = await PasswordReset.findOne({
    where: { pr_token: token, pr_usado: 0 },
  });

  if (!reset) return res.status(400).json({ error: "Token inválido." });

  if (new Date(reset.pr_expira) < new Date()) {
    return res.status(400).json({ error: "Token expirado." });
  }

  return res.json({ valid: true });
};

// 3) Salvar nova senha
const redefinirSenha = async (req, res) => {
  const { token, novaSenha } = req.body;

  const reset = await PasswordReset.findOne({
    where: { pr_token: token, pr_usado: 0 },
  });

  if (!reset) return res.status(400).json({ error: "Token inválido." });
  if (new Date(reset.pr_expira) < new Date()) {
    return res.status(400).json({ error: "Token expirado." });
  }

  const user = await findUserByEmail(reset.pr_email);

  const hash = await bcrypt.hash(novaSenha, 10);

  if (user.al_id) {
    await user.update({ al_senha: hash });
  } else if (user.fu_id) {
    await user.update({ fu_senha: hash });
  }

  await reset.update({ pr_usado: 1 });

  return res.json({ message: "Senha alterada com sucesso!" });
};

module.exports = {
  solicitarReset,
  validarToken,
  redefinirSenha,
};
