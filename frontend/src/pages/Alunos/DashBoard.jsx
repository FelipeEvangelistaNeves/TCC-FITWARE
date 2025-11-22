import React, { useState } from "react";
import "../../styles/pages/aluno/dashboardAluno.scss";
import TreinoActiveModal from "./TreinoActiveModal";

export default function DashboardAluno() {
  const treinosmock = [
    {
      id: 1,
      tipo: "Força",
      titulo: "Treino de Força",
      nivel: "Intermediário",
      tempo: 45,
      exercicios: [
        {
          nome: "Agachamento",
          sets: "3×12",
          descricao: "Mantenha a postura ereta e desça até 90 graus.",
        },
        {
          nome: "Supino",
          sets: "3×10",
          descricao: "Barra na linha do peito, cotovelos levemente fechados.",
        },
        {
          nome: "Remada",
          sets: "3×10",
          descricao:
            "Puxe a barra em direção ao abdômen, contraindo as costas.",
        },
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
        {
          nome: "Corrida",
          sets: "20 min",
          descricao: "Ritmo moderado constante na esteira ou rua.",
        },
        {
          nome: "Pular corda",
          sets: "10 min",
          descricao: "Saltos curtos e rápidos, mantendo o ritmo.",
        },
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
        {
          nome: "Burpees",
          sets: "3×15",
          descricao: "Movimento completo: flexão, agachamento e salto.",
        },
        {
          nome: "Prancha",
          sets: "3×1 min",
          descricao: "Corpo alinhado, contraia o abdômen e glúteos.",
        },
      ],
      treinador: "João Paulo",
    },
  ];
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
          <div className="card-number">12</div>
          <div className="card-subtitle">Disponíveis</div>
        </div>
        <div className="summary-card">
          <h3>Desafios</h3>
          <div className="card-number">3</div>
          <div className="card-subtitle">Ativos</div>
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
