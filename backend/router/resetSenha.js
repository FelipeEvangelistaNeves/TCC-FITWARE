const express = require("express");
const {
  solicitarReset,
  validarToken,
  redefinirSenha,
} = require("../controllers/resetSenhaController.js");

const router = express.Router();

router.post("/esqueci-senha", solicitarReset);
router.get("/validar-token/:token", validarToken);
router.post("/resetar-senha", redefinirSenha);

module.exports = router;
