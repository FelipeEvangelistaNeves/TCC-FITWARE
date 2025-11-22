import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/dashboardAluno.scss";
import "../../styles/pages/aluno/treinos.scss";
import TreinoActiveModal from "./TreinoActiveModal";

export default function TreinoAluno() {
  const [erro, setErro] = useState(null);

  const [treinos, setTreinos] = useState([]);

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
  const [treinoAtivo, setTreinoAtivo] = useState(null);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [timerAtivo, setTimerAtivo] = useState(false);

  // Filtragem por tipo e busca
  const treinosFiltrados = treinos.filter(
    (t) =>
      (filtro === "Todos" || t.tipo === filtro) &&
      t.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  // Controle do cronômetro
  useEffect(() => {
    let intervalo;
    if (timerAtivo && tempoRestante > 0) {
      intervalo = setInterval(() => {
        setTempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (tempoRestante === 0 && treinoAtivo) {
      setTimerAtivo(false);
      setTreinoAtivo(null);
    }
    return () => clearInterval(intervalo);
  }, [timerAtivo, tempoRestante]);

  const iniciarTreino = (treino) => {
    setTreinoAtivo(treino.id);
    setTempoRestante(treino.tempo * 60);
    setTimerAtivo(true);
  };

  const pararTreino = () => {
    setTimerAtivo(false);
    setTreinoAtivo(null);
  };

  const formatarTempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="dashboard-aluno">
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

              {treinoAtivo === treino.id && timerAtivo ? (
                <div className="workout-timer">
                  <div className="timer-display">
                    {formatarTempo(tempoRestante)}
                  </div>
                  <button className="stop-btn" onClick={pararTreino}>
                    Parar
                  </button>
                </div>
              ) : (
                <button
                  className="start-btn"
                  onClick={() => iniciarTreino(treino)}
                >
                  Iniciar
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
