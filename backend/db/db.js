const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fitware",
  password: "1234",
  port: 5432,
});

async function buscarComPool() {
  const query = `
    SELECT a.id_aluno, a.nome AS aluno_nome, a.email,
           t.id_turma, t.nome_turma,
           p.id_professor, p.nome AS professor_nome, p.especialidade
    FROM alunos a
    JOIN alunos_turmas at ON a.id_aluno = at.id_aluno
    JOIN turmas t ON at.id_turma = t.id_turma
    JOIN professores p ON t.id_professor = p.id_professor
    ORDER BY a.nome ASC;
  `;

  try {
    const result = await pool.query(query);
    console.log(result.rows);
  } catch (err) {
    console.error("Erro na query:", err);
  }
}
