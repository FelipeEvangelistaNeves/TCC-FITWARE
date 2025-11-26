const nodemailer = require("nodemailer");

const enviarEmail = async (para, assunto, mensagem) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: para,
    subject: assunto,
    html: mensagem,
  });
};

module.exports = { enviarEmail };
