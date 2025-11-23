import React, { useState, useEffect } from "react";
import "../../styles/pages/professor/mensagensProf.scss";
import PerfilAluno from "./PerfilAluno";

export default function AlunosProf() {
  const [alunos, setAlunos] = useState([]);
  const [filtro, setFiltro] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/professor/allAlunos`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Erro ao buscar alunos");

        const data = await res.json();

        setAlunos(data.alunos);
      } catch (error) {
        console.error(error);
        setErro("Erro ao carregar alunos");
      }
    };

    fetchAlunos();
  }, []);

  const alunosFiltrados = alunos.filter((aluno) => {
    const condBusca = aluno.al_nome
      ?.toLowerCase()
      .includes(busca.toLowerCase());

    const condFiltro =
      filtro === "Todos" ||
      (filtro === "Ativos" && aluno.al_status === "Ativo") ||
      (filtro === "Inativos" && aluno.al_status === "Inativo");

    return condBusca && condFiltro;
  });

  if (alunoSelecionado) {
    return (
      <PerfilAluno
        aluno={alunoSelecionado}
        onBack={() => setAlunoSelecionado(null)}
      />
    );
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

      {/* Lista de alunos */}
      <div className="messages-list">
        {alunosFiltrados.map((aluno) => {
          const initials = aluno.al_nome
            ? aluno.al_nome
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase()
            : "A";

          return (
            <div
              key={aluno.al_id}
              className="message-item"
              onClick={() => setAlunoSelecionado(aluno)}
            >
              <div className="message-avatar" style={{ background: "#7f24c6" }}>
                <span>{initials}</span>
              </div>

              <div className="message-content">
                <div className="message-header">
                  <h4 className="message-name">{aluno.al_nome}</h4>
                  <span className="message-time">{aluno.al_email}</span>
                </div>

                <p className="message-preview">
                  Pontos {aluno.al_pontos} — {aluno.al_status}
                </p>

                <p className="message-preview">
                  Treinos completos: {aluno.al_treinos_completos}
                </p>
              </div>

              <div className="message-actions">
                {aluno.al_status === "Ativo" && (
                  <div className="unread-badge"></div>
                )}
              </div>
            </div>
          );
        })}

        {alunosFiltrados.length === 0 && (
          <p style={{ textAlign: "center", color: "#9ca3af" }}>
            Nenhum aluno encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
