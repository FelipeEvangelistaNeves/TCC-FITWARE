const LoggerMessages = {
  SESSION_CREATED: "Sessão criada",
  SESSION_DESTROYED: "Sessão destruída",
  LOGIN_SUCCESS: "Login bem-sucedido",
  LOGIN_FAILED: "Credenciais inválidas",
  SERVER_ERROR: "Erro no servidor",
  AUTH_SUCCESS: "Autenticado com sucesso",
  USER_NOT_FOUND: "Usuário não encontrado",
  ROLE_ERROR: "User / Role não setada corretamente",
};

Object.freeze(LoggerMessages); // impede alterações
module.exports = LoggerMessages;
