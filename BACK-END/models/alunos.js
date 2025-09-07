// alunos, alunos_turmas, produtos, pagamentos, modalidades, horarios, funcionarios, treinos, exercícios

export const alunos = {
  alunos: [
    {
      al_id: 1,
      al_nome: "João Silva",
      al_email: "joao@email.com",
      al_senha: "123456",
      al_cpf: "12345678901",
      al_telefone: "11987654321",
      al_dtnasc: "2005-08-15",
      al_pontos: 150,
    },
  ],
  turmas: [
    {
      tu_id: 1,
      tu_nome: "Física",
      tu_prof_id: 2,
      tu_mod_id: 1,
      tu_hor_id: 1,
    },
  ],
  alunos_turmas: [
    {
      al_tu_id: 1,
      tu_al_id: 1,
    },
  ],
  produtos: [
    {
      pd_id: 1,
      pd_nome: "Camisa Fitness",
      pd_valor: 89,
      pd_descricao: "Camisa de treino dry-fit",
    },
  ],
  desafios: [
    {
      de_id: 1,
      de_nome: "Corrida 5km",
      de_descricao: "Completar uma corrida de 5km",
      de_pontos: 50,
      de_desafio: "correr_5km",
      de_progresso: 30,
      de_start: "2025-08-01 08:00:00",
      de_end: "2025-08-30 23:59:59",
    },
  ],
  pagamentos: [
    {
      pa_id: 1,
      pa_aluno_id: 1,
      pa_valor: 199.9,
      pa_metodo: "C",
      pa_status: "Pago",
      pa_data: "2025-08-15",
    },
  ],
  modalidades: [
    {
      mo_id: 1,
      mo_nome: "Musculação",
      mo_descricao: "Treino de resistência e força",
    },
  ],
  horarios: [
    {
      hor_id: 1,
      hor_start: "08:00:00",
      hor_end: "09:00:00",
      hor_dia: "Segunda",
    },
  ],
  funcionarios: [
    {
      fu_id: 2,
      fu_nome: "Carlos Pereira",
      fu_email: "carlos@academia.com",
      fu_senha: "654321",
      fu_cpf: "98765432100",
      fu_telefone: "11912345678",
      fu_dtnasc: "1985-04-22",
      fu_cargo: "Professor",
      fu_cref: "CREF12345SP",
    },
  ],
  treinos: [
    {
      tr_id: 1,
      tr_prof_id: 2,
      tr_nome: "Treino de Pernas",
      tr_descricao: "Série focada em quadríceps e glúteos",
      tr_repeticoes: "3x12",
    },
  ],
  exercicios: [
    {
      ex_id: 1,
      ex_nome: "Agachamento Livre",
      ex_instrucao: "Manter a coluna reta e agachar até 90 graus",
      ex_video: "https://youtube.com/agachamento",
    },
  ],
  treinos_exercicios: [
    {
      tr_ex_id: 1,
      ex_tr_id: 1,
    },
  ],
};
