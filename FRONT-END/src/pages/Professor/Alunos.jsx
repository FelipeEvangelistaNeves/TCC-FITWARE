import React, { useState, useMemo} from "react";
import "../../styles/pages/professor/alunosProf.scss";
import PerfilAluno from "./PerfilAluno";

export default function AlunosProf() {
  const [filtro, setFiltro] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  const alunos = [
    { id: 1, nome: "Maria Silva", turma: "Segunda", tempo: "3 meses", status: "Ativo", avatar: "MS", color: "#8b5cf6", email: "maria@email.com", telefone: "99999-0001" },
    { id: 2, nome: "Pedro Alves", turma: "Quarta", tempo: "6 meses", status: "Ativo", avatar: "PA", color: "#22c55e", email: "pedro@email.com", telefone: "99999-0002" },
    { id: 3, nome: "Carlos Mendes", turma: "Segunda", tempo: "1 mês", status: "Inativo", avatar: "CM", color: "#f59e0b", email: "carlos@email.com", telefone: "99999-0003" },
    { id: 4, nome: "Ana Santos", turma: "Quarta", tempo: "2 meses", status: "Ativo", avatar: "AS", color: "#a855f7", email: "ana@email.com", telefone: "99999-0004" },
  ];

  const alunosFiltrados = alunos.filter((aluno) => {
    const condBusca = aluno.nome.toLowerCase().includes(busca.toLowerCase());
    const condFiltro =
      filtro === "Todos" ||
      (filtro === "Ativos" && aluno.status === "Ativo") ||
      (filtro === "Inativos" && aluno.status === "Inativo") ||
      aluno.turma === filtro;

    return condBusca && condFiltro;
  });

  if (alunoSelecionado) {
    return (
      <PerfilAluno aluno={alunoSelecionado} onBack={() => setAlunoSelecionado(null)} />
    );
  }

  return (
    <div className="alunos">
      <input
        type="text"
        placeholder="Buscar aluno..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {/* 📌 Filtros */}
      <div className="filtros">
        {["Todos", "Ativos", "Inativos", "Segunda", "Quarta"].map((f) => (
          <button
            key={f}
            className={filtro === f ? "ativo" : ""}
            onClick={() => setFiltro(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 📋 Lista de alunos */}
      <div className="lista-alunos">
        {alunosFiltrados.map((aluno) => (
          <div
            key={aluno.id}
            className="aluno-card"
            onClick={() => setAlunoSelecionado(aluno)}
          >
            <div className="avatar" style={{ background: aluno.color }}>
              {aluno.avatar}
            </div>
            <div className="info">
              <div className="nome">{aluno.nome}</div>
              <div className="detalhes">
                Turma {aluno.turma} • {aluno.tempo}
              </div>
            </div>
          </div>
        ))}

        {alunosFiltrados.length === 0 && <p>Nenhum aluno encontrado.</p>}
      </div>
    </div>
  );
}
