import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/dashboardAluno.scss";
import "../../styles/pages/aluno/treinos.scss";
import TreinoActiveModal from "./TreinoActiveModal";
import TreinoDetalhesModal from "./TreinosDetalhes";

export default function TreinoAluno() {
  const [erro, setErro] = useState(null);

  const [treinos, setTreinos] = useState([]);

  const [treinoDetalhes, setTreinoDetalhes] = useState(null);

  const abrirDetalhes = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/treinos/detalhes/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await res.json();
    setTreinoDetalhes(data);
  };

  useEffect(() => {
    const fetchTreinos = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/treinos/aluno`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json; charset=utf-8",
            },
          }
        );

        if (!res.ok) throw new Error("Erro ao buscar treinos do aluno");

        const data = await res.json();
        const treinosFormatados = data.map((t) => ({
          id: t.id,
          titulo: t.nome,
          nivel: t.dificuldade,
          treinador: t.funcionario,
          exercicios: t.exercicios.map((ex) => ({
            nome: ex.nome,
            sets: `${ex.series}×${ex.repeticoes}`,
          })),
        }));
        setTreinos(treinosFormatados);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTreinos();
  }, []);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [modalTreinoAtivo, setModalTreinoAtivo] = useState(null);

  // Filtragem por tipo e busca
  const treinosFiltrados = treinos.filter(
    (t) =>
      (filtro === "Todos" || t.tipo === filtro) &&
      t.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  const iniciarTreino = (treino) => {
    setModalTreinoAtivo(treino);
  };

  return (
    <div className="dashboard-aluno">
      {treinoDetalhes && (
        <TreinoDetalhesModal
          treino={treinoDetalhes}
          onClose={() => setTreinoDetalhes(null)}
        />
      )}

      {/* Barra de busca */}
      <div className="search-container">
        <div className="search-bar">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Buscar treino..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Seção de treinos */}
      <section className="workouts-section">
        {/* Cards de treino */}
        {treinosFiltrados.map((treino) => (
          <div className="workout-card" key={treino.id}>
            <div className="workout-header">
              <div className="workout-info">
                <h3>{treino.titulo}</h3>
                <p className="workout-details">{treino.nivel}</p>
              </div>
            </div>

            <div className="exercises-list">
              {treino.exercicios.map((ex, i) => (
                <div className="exercise-item" key={i}>
                  <span className="exercise-number">{i + 1}</span>
                  <span className="exercise-name">{ex.nome}</span>
                  <span className="exercise-sets">{ex.sets}</span>
                </div>
              ))}
            </div>

            <div className="workout-footer">
              <div className="trainer-info">
                <div className="trainer-avatar">
                  {treino.treinador[0] + treino.treinador.split(" ")[1][0]}
                </div>
                <span className="trainer-name">{treino.treinador}</span>
              </div>

              <button
                className="start-btn"
                onClick={() => abrirDetalhes(treino.id)}
              >
                Detalhes
              </button>

              <button
                className="start-btn"
                onClick={() => iniciarTreino(treino)}
              >
                Iniciar
              </button>
            </div>
          </div>
        ))}
      </section>

      {modalTreinoAtivo && (
        <TreinoActiveModal
          treino={modalTreinoAtivo}
          onClose={() => setModalTreinoAtivo(null)}
          onMinimize={() => setModalTreinoAtivo(null)}
        />
      )}
    </div>
  );
}
