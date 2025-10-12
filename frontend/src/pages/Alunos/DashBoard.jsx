import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/dashboardAluno.scss";

export default function DashboardAluno() {
  const treinos = [
    {
      id: 1,
      tipo: "Força",
      titulo: "Treino de Força",
      nivel: "Intermediário",
      tempo: 45,
      exercicios: [
        { nome: "Agachamento", sets: "3×12" },
        { nome: "Supino", sets: "3×10" },
        { nome: "Remada", sets: "3×10" },
      ],
      treinador: "João Paulo",
    },
    {
      id: 2,
      tipo: "Cardio",
      titulo: "Treino de Cardio",
      nivel: "Iniciante",
      tempo: 30,
      exercicios: [
        { nome: "Corrida", sets: "20 min" },
        { nome: "Pular corda", sets: "10 min" },
      ],
      treinador: "João Paulo",
    },
    {
      id: 3,
      tipo: "Funcional",
      titulo: "Treino Funcional",
      nivel: "Avançado",
      tempo: 50,
      exercicios: [
        { nome: "Burpees", sets: "3×15" },
        { nome: "Prancha", sets: "3×1 min" },
      ],
      treinador: "João Paulo",
    },
  ];

  const [filtro, setFiltro] = useState("Todos");
  const [treinoAtivo, setTreinoAtivo] = useState(null);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [timerAtivo, setTimerAtivo] = useState(false);

  const treinosFiltrados =
    filtro === "Todos" ? treinos : treinos.filter((t) => t.tipo === filtro);

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
      <section className="summary-cards">
        <div className="summary-card">
          <h3>Treinos</h3>
          <div className="card-number">12</div>
          <div className="card-subtitle">Completos</div>
        </div>
        <div className="summary-card">
          <h3>Desafios</h3>
          <div className="card-number">3</div>
          <div className="card-subtitle">Ativos</div>
        </div>
        <div className="summary-card">
          <h3>Calorias</h3>
          <div className="card-number">450</div>
          <div className="card-subtitle">Hoje</div>
        </div>
      </section>

      <section className="workouts-section">
        <div className="section-header">
          {["Todos", "Força", "Cardio", "Funcional"].map((tipo) => (
            <button
              key={tipo}
              className={`filter-btn ${filtro === tipo ? "active" : ""}`}
              onClick={() => setFiltro(tipo)}
            >
              {tipo}
            </button>
          ))}
        </div>

        {treinosFiltrados.map((treino) => (
          <div className="workout-card" key={treino.id}>
            <div className="workout-header">
              <div className="workout-info">
                <h3>{treino.titulo}</h3>
                <p className="workout-details">
                  {treino.nivel} • {treino.tempo} min
                </p>
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
                  <div className="timer-display">{formatarTempo(tempoRestante)}</div>
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
