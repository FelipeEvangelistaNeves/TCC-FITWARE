// export const alunos = [
//   {
//     al_id: 1,
//     al_nome: "Marcus",
//     al_email: "marcus@gmail.com",
//     al_senha: "123456",
//     al_cpf: "12345678901",
//     al_telefone: "11987654321",
//     al_dtnasc: "2008-01-02T02:00:00.000Z",
//     al_pontos: 150,
//   },
//   {
//     al_id: 2,
//     al_nome: "Anthony",
//     al_email: "anthony@gmail.com",
//     al_senha: "654321",
//     al_cpf: "10987654321",
//     al_telefone: "11912345678",
//     al_dtnasc: "2007-10-12T03:00:00.000Z",
//     al_pontos: 300,
//   },
//   {
//     al_id: 3,
//     al_nome: "Filipe",
//     al_email: "filipe@gmail.com",
//     al_senha: "162534",
//     al_cpf: "12345678109",
//     al_telefone: "11943215678",
//     al_dtnasc: "2008-04-25T03:00:00.000Z",
//     al_pontos: 0,
//   },
// ];

// models/UserModel.js

// "Banco de dados" em memória
const alunos = [
  { id: 1, username: "marcus", password: "1234" },
  { id: 2, username: "ana", password: "abcd" },
];

// Funções de CRUD simuladas
class AlunoModel {
  static findByUsername(username) {
    return alunos.find((aluno) => aluno.username === username);
  }

  static create(username, password) {
    const newAluno = {
      id: alunos.length + 1,
      username,
      password,
    };
    alunos.push(newAluno);
    return newAluno;
  }

  static getAll() {
    return alunos;
  }
}

module.exports = AlunoModel;
