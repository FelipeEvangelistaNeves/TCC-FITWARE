import "../../styles/pages/aluno/dashboardAluno.scss";
import TreinoActiveModal from "./TreinoActiveModal";
import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/treinos.scss";

export default function DashboardAluno() {
  const [treinosCompletos, setTreinosCompletos] = useState();
  const [treinos, setTreinos] = useState([]);

  // Função para buscar treinos (pode ser reutilizada)
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

      if (!res.ok) throw new Error(`Erro na resposta: ${res.status}`);

      const data = await res.json();

      const treinosFormatados = data.treinos.map((t) => ({
        id: t.id,
        titulo: t.nome,
        descricao: t.descricao,
        nivel: t.dificuldade,
        treinador: t.funcionario,
        exercicios: t.exercicios.map((ex) => ({
          nome: ex.nome,
          sets: `${ex.series}×${ex.repeticoes}`,
          series: ex.series,
          repeticoes: ex.repeticoes,
          instrucao: ex.instrucao,
          descanso: ex.descanso,
        })),
      }));

      setTreinosCompletos(data.treinos_completos);
      setTreinos(treinosFormatados);
    } catch (error) {}
  };

  useEffect(() => {
    fetchTreinos();
  }, []);

  const [filtro, setFiltro] = useState("Todos");
  const [modalTreinoAtivo, setModalTreinoAtivo] = useState(null);

  const treinosFiltrados =
    filtro === "Todos" ? treinos : treinos.filter((t) => t.tipo === filtro);

  const iniciarTreino = (treino) => {
    setModalTreinoAtivo(treino);
  };

  return (
    <div className="dashboard-aluno">
      <section className="summary-cards">
        <div className="summary-card">
          <h3>Treinos</h3>
          <div className="card-number">{treinosCompletos}</div>
          <div className="card-subtitle">Completos</div>
        </div>
        <div className="summary-card">
          <h3>Desafios</h3>
          <div className="card-number">2</div>
          <div className="card-subtitle">Ativos</div>
        </div>
        <div className="summary-card">
          <h3>Treinos</h3>
          <div className="card-number">{treinos.length}</div>
          <div className="card-subtitle">Disponíveis</div>
        </div>
      </section>

      <section className="workouts-section">
        {treinosFiltrados.map((treino) => (
          <div className="workout-card" key={treino.id}>
            <div className="workout-header">
              <div className="workout-info">
                <h3>{treino.titulo}</h3>
                <p className="workout-details">{treino.nivel}</p>
              </div>
            </div>

            <div className="exercises-list">
              {treino.exercicios.slice(0, 3).map((ex, i) => (
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

              <div className="workout-actions">
                <button
                  className="start-btn"
                  onClick={() => iniciarTreino(treino)}
                >
                  Iniciar
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {modalTreinoAtivo && (
        <TreinoActiveModal
          treino={modalTreinoAtivo}
          onClose={() => setModalTreinoAtivo(null)}
          onMinimize={() => setModalTreinoAtivo(null)}
          onTreinoCompleted={() => {
            setModalTreinoAtivo(null);
            fetchTreinos();
          }}
        />
      )}
    </div>
  );
}
