const { Aluno, Funcionario } = require("../models");

exports.protectedRoute = async (req, res) => {
  try {
    const { id, role } = req.session.user;

    let user;
    if (role === "Aluno") {
      user = await Aluno.findByPk(id);
    } else {
      user = await Funcionario.findByPk(id);
    }

    if (!user) {
      return res.status(401).json({
        message: "User / Role não setada corretamente",
        error: "Usuário não encontrado",
      });
    }

    res.json({
      message: "Autenticado com sucesso",
      user: {
        id: user.id,
        nome: user.al_nome || user.fu_nome,
        email: user.al_email || user.fu_email,
        role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    console.log("Sessão destruída");
    res.json({ success: true, message: "Logout efetuado" });
  });
};
