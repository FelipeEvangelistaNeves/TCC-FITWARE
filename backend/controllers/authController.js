const { Aluno, Funcionario } = require("../models");
const LoggerMessages = require("../loggerMessages");

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
        message: LoggerMessages.ROLE_ERROR,
        error: LoggerMessages.USER_NOT_FOUND,
      });
    }

    res.json({
      message: LoggerMessages.AUTH_SUCCESS,
      user: {
        id: user.id,
        nome: user.al_nome || user.fu_nome,
        email: user.al_email || user.fu_email,
        role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: LoggerMessages.SERVER_ERROR });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    console.log(LoggerMessages.SESSION_DESTROYED);
    res.json({ success: true, message: LoggerMessages.SESSION_DESTROYED });
  });
};
