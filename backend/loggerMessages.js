const LoggerMessages = {
  SESSION_CREATED: "Sessão criada",
  SESSION_DESTROYED: "Sessão destruída",

  LOGIN_SUCCESS: "Login bem-sucedido",
  LOGIN_FAILED: "Credenciais inválidas",

  SERVER_ERROR: "Erro no servidor",

  AUTH_SUCCESS: "Autenticado com sucesso",
  AUTH_FAILED: "Falha na autenticação",

  ACESS_DENIED: "Acesso negado",
  USER_NOT_FOUND: "Usuário não encontrado",
  ROLE_ERROR: "User / Role não setada corretamente",

  ALUNO_SUCCESS: "área do aluno",
  PROFESSOR_SUCCESS: "área do professor",
  ADMIN_SUCCESS: "área do admin",

  TREINOS_FAILED: "Erro ao buscar treinos",
};

Object.freeze(LoggerMessages); // impede alterações
module.exports = LoggerMessages;
