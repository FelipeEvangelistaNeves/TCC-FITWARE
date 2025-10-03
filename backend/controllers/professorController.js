const { Funcionario } = require("../models");

exports.loginProfessor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const funcionario = await Funcionario.findByEmail(email);

    if (
      !funcionario ||
      funcionario.fu_senha !== password ||
      funcionario.fu_cargo !== "Professor"
    ) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    req.session.user = {
      id: funcionario.fu_id,
      email: funcionario.fu_email,
      role: funcionario.fu_cargo,
    };

    console.log("Sessão criada:", req.session.user);
    res.json({ message: "Login bem-sucedido", user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
};
