import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/mensagensAluno.scss";
import "../../styles/pages/aluno/dashboardAluno.scss";
import "../../styles/pages/aluno/treinos.scss";
import DetalhesTreino from "./DetalhesTreino";
import EditarTreino from "./EditarTreino";

export default function DashboardAluno() {
  const [treinos, setTreinos] = useState([]);
  const [erro, setErro] = useState(null);
  const [treinoSelecionado, setTreinoSelecionado] = useState(null);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const [novoTreino, setNovoTreino] = useState(false);

  useEffect(() => {
    const fetchTreinos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/treinos", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Erro ao buscar treinos"); // colocar logger message depois

        const data = await res.json();
        setTreinos(data);
      } catch (error) {
        console.error(error);
        setErro("Erro ao carregar treinos"); // colocar logger message depois
      }
    };

    fetchTreinos();
  }, []); // executa apenas 1x ao montar o componente
  if (erro) return <p>{erro}</p>;

  const abrirDetalhes = (treino) => {
    setTreinoSelecionado(treino);
    setMostrarDetalhes(true);
  };

  const fecharDetalhes = () => {
    setMostrarDetalhes(false);
    setTreinoSelecionado(null);
  };

  const abrirNovoTreino = (treino) => {
    setNovoTreino(true);
    setTreinoSelecionado(treino);
  };

  const fecharNovoTreino = () => {
    setTreinoSelecionado(null);
    setNovoTreino(false);
  };
  return (
    <div className="dashboard-aluno">
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar treino..."
            className="search-input"
          />
        </div>
      </div>
      {/* Workouts Section */}
      <section className="workouts-section">
        <div className="section-header">
          <button className="filter-btn">Todos</button>
          <button className="filter-btn">Força</button>
          <button className="filter-btn">Cardio</button>
          <button className="filter-btn">Funcional</button>
        </div>

        {treinos.length === 0 ? (
          <p>Nenhum treino encontrado.</p>
        ) : (
          treinos.map((treino) => (
            <div className="workout-card" key={treino.tr_id}>
              <div className="workout-header">
                <div className="workout-info">
                  <h3>{treino.tr_nome}</h3>
                  <p className="workout-details">{treino.tr_descricao}</p>
                </div>
              </div>

              <div className="exercises-list">
                {treino.Exercicios?.map((ex, index) => (
                  <div className="exercise-item" key={ex.ex_id}>
                    <span className="exercise-number">{index + 1}</span>
                    <span className="exercise-name">{ex.ex_nome}</span>
                    <span className="exercise-sets">
                      {ex.ex_repeticoes || ""}
                    </span>
                  </div>
                ))}
              </div>

              <div className="workout-footer">
                <div className="trainer-info">
                  <div className="trainer-avatar">
                    {treino.Funcionario?.fu_nome
                      ? treino.Funcionario.fu_nome.substring(0, 2).toUpperCase()
                      : "??"}
                  </div>
                  <span className="trainer-name">
                    {treino.Funcionario?.fu_nome || "Sem professor"}
                  </span>
                </div>
              </div>

              <div className="treino-actions">
                <button
                  className="start-btn"
                  onClick={() => abrirNovoTreino(treino)}
                >
                  Editar
                </button>
                <button
                  className="btn-detalhes"
                  onClick={() => abrirDetalhes(treino)}
                >
                  Detalhes
                </button>
              </div>
            </div>
          ))
        )}
      </section>
      <div className="treino-actions">
        <button className="new-btn" onClick={() => abrirNovoTreino(null)}>
          Adicionar Novo Treino
        </button>
      </div>

      {mostrarDetalhes && treinoSelecionado && (
        <DetalhesTreino treino={treinoSelecionado} onClose={fecharDetalhes} />
      )}
      {novoTreino && (
        <EditarTreino treino={treinoSelecionado} onClose={fecharNovoTreino} />
      )}
    </div>
  );
}
