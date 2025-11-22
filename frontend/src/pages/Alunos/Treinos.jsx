import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/dashboardAluno.scss";
import "../../styles/pages/aluno/treinos.scss";

export default function TreinoAluno() {
  const [treinos, setTreinos] = useState([]);
  const [erro, setErro] = useState(null);

  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  const [treinoAtivo, setTreinoAtivo] = useState(null);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [timerAtivo, setTimerAtivo] = useState(false);

  // 🔄 Carregar treinos do backend
  useEffect(() => {
    const fetchTreinos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/treinos", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Erro ao carregar treinos");

        const data = await res.json();
        setTreinos(data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao carregar treinos");
      }
    };

    fetchTreinos();
  }, []);

  if (erro) return <p>{erro}</p>;

  // 🔍 FILTROS + BUSCA COM BASE NO BANCO
  const treinosFiltrados = treinos.filter((t) => {
    const texto = busca.toLowerCase();

    const nomeMatch = t.tr_nome?.toLowerCase().includes(texto);
    const descMatch = t.tr_descricao?.toLowerCase().includes(texto);

    const exerciciosMatch = t.Exercicios?.some((ex) =>
      ex.ex_nome.toLowerCase().includes(texto)
    );

    const categoriaMatch =
      filtro === "Todos" ||
      t.tr_categoria?.toLowerCase() === filtro.toLowerCase();

    return (nomeMatch || descMatch || exerciciosMatch) && categoriaMatch;
  });

  // 🕒 CRONÔMETRO
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
    setTreinoAtivo(treino.tr_id);
    setTempoRestante((treino.tr_tempo || 30) * 60); // fallback caso não tenha campo
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

        {/* Cards de treino */}
        {treinosFiltrados.map((treino) => (
          <div className="workout-card" key={treino.tr_id}>
            <div className="workout-header">
              <div className="workout-info">
                <h3>{treino.tr_nome}</h3>
                <p className="workout-details">
                  {treino.tr_descricao || "Sem descrição"}
                </p>
              </div>
            </div>

            <div className="exercises-list">
              {treino.Exercicios?.map((ex, i) => (
                <div className="exercise-item" key={ex.ex_id}>
                  <span className="exercise-number">{i + 1}</span>
                  <span className="exercise-name">{ex.ex_nome}</span>
                  <span className="exercise-sets">{ex.ex_repeticoes}</span>
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

              {treinoAtivo === treino.tr_id && timerAtivo ? (
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
