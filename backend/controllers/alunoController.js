const { Aluno } = require("../models");

exports.loginAluno = async (req, res) => {
  const { email, password } = req.body;

  try {
    const aluno = await Aluno.findByEmail(email);

    if (!aluno || aluno.al_senha !== password) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    req.session.user = {
      id: aluno.al_id,
      email: aluno.al_email,
      role: "Aluno",
    };

    console.log("Sessão criada:", req.session.user);
    res.json({ message: "Login bem-sucedido", user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
};
