const { Funcionario } = require("../models");
const LoggerMessages = require("../loggerMessage");

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const funcionario = await Funcionario.findByEmail(email);

    if (
      !funcionario ||
      funcionario.fu_senha !== password ||
      funcionario.fu_cargo !== "Secretario"
    ) {
      return res.status(401).json({ message: LoggerMessages.LOGIN_FAILED });
    }

    req.session.user = {
      id: funcionario.fu_id,
      email: funcionario.fu_email,
      role: funcionario.fu_cargo,
    };

    console.log(LoggerMessages.SESSION_CREATED, req.session.user);
    res.json({ message: LoggerMessages.LOGIN_SUCCESS, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: LoggerMessages.SERVER_ERROR });
  }
};
