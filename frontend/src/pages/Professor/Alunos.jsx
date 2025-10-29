import React, { useState } from "react";
import "../../styles/pages/professor/mensagensProf.scss";
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
    return <PerfilAluno aluno={alunoSelecionado} onBack={() => setAlunoSelecionado(null)} />;
  }

  return (
    <div className="mensagens-aluno">
      
      {/* Busca */}
      <div className="search-container">
        <div className="search-bar">
          <i className="bi bi-search search-icon"></i>
          <input
            type="text"
            placeholder="Buscar aluno..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Filtros */}
      <div className="filter-tabs">
        {["Todos", "Ativos", "Inativos", "Segunda", "Quarta"].map((f) => (
          <button
            key={f}
            className={`filter-tab ${filtro === f ? "active" : ""}`}
            onClick={() => setFiltro(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Lista de alunos */}
      <div className="messages-list">
        {alunosFiltrados.map((aluno) => (
          <div
            key={aluno.id}
            className="message-item"
            onClick={() => setAlunoSelecionado(aluno)}
          >
            <div className="message-avatar" style={{ background: aluno.color }}>
              <span>{aluno.avatar}</span>
            </div>

            <div className="message-content">
              <div className="message-header">
                <h4 className="message-name">{aluno.nome}</h4>
                <span className="message-time">{aluno.tempo}</span>
              </div>
              <p className="message-preview">Turma {aluno.turma} — {aluno.status}</p>
            </div>

            <div className="message-actions">
              {aluno.status === "Ativo" && (
                <div className="unread-badge"></div>
              )}
            </div>
          </div>
        ))}

        {alunosFiltrados.length === 0 && (
          <p style={{ textAlign: "center", color: "#9ca3af" }}>
            Nenhum aluno encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
