const { Aluno } = require("../models");
const LoggerMessages = require("../loggerMessages");

exports.loginAluno = async (req, res) => {
  const { email, password } = req.body;

  try {
    const aluno = await Aluno.findByEmail(email);

    if (!aluno || aluno.al_senha !== password) {
      return res
        .status(401)
        .json({ success: false, message: LoggerMessages.LOGIN_FAILED });
    }

    req.session.user = {
      id: aluno.al_id,
      email: aluno.al_email,
      role: "Aluno",
    };

    console.log(LoggerMessages.SESSION_CREATED, req.session.user);

    return res.json({
      success: true,
      message: LoggerMessages.LOGIN_SUCCESS,
      user: req.session.user,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: LoggerMessages.SERVER_ERROR });
  }
};
