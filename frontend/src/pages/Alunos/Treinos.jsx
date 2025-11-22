import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/dashboardAluno.scss";
import "../../styles/pages/aluno/treinos.scss";
import TreinoActiveModal from "./TreinoActiveModal";

export default function TreinoAluno() {
  const [treinos, setTreinos] = useState([
    {
      tr_id: 1,
      tr_nome: "Treino de Força",
      tr_categoria: "Força",
      tr_descricao: "Intermediário • 45 min",
      tr_tempo: 45,
      Funcionario: { fu_nome: "João Paulo" },
      Exercicios: [
        {
          ex_id: 1,
          ex_nome: "Agachamento",
          ex_repeticoes: "3×12",
          ex_descricao: "Mantenha a postura ereta e desça até 90 graus.",
        },
        {
          ex_id: 2,
          ex_nome: "Supino",
          ex_repeticoes: "3×10",
          ex_descricao:
            "Barra na linha do peito, cotovelos levemente fechados.",
        },
        {
          ex_id: 3,
          ex_nome: "Remada",
          ex_repeticoes: "3×10",
          ex_descricao:
            "Puxe a barra em direção ao abdômen, contraindo as costas.",
        },
      ],
    },
    {
      tr_id: 2,
      tr_nome: "Treino de Cardio",
      tr_categoria: "Cardio",
      tr_descricao: "Iniciante • 30 min",
      tr_tempo: 30,
      Funcionario: { fu_nome: "João Paulo" },
      Exercicios: [
        {
          ex_id: 4,
          ex_nome: "Corrida",
          ex_repeticoes: "20 min",
          ex_descricao: "Ritmo moderado constante na esteira ou rua.",
        },
        {
          ex_id: 5,
          ex_nome: "Pular corda",
          ex_repeticoes: "10 min",
          ex_descricao: "Saltos curtos e rápidos, mantendo o ritmo.",
        },
      ],
    },
    {
      tr_id: 3,
      tr_nome: "Treino Funcional",
      tr_categoria: "Funcional",
      tr_descricao: "Avançado • 60 min",
      tr_tempo: 60,
      Funcionario: { fu_nome: "João Paulo" },
      Exercicios: [
        {
          ex_id: 6,
          ex_nome: "Burpees",
          ex_repeticoes: "3×15",
          ex_descricao: "Movimento completo: flexão, agachamento e salto.",
        },
        {
          ex_id: 7,
          ex_nome: "Mountain Climbers",
          ex_repeticoes: "3×20",
          ex_descricao:
            "Traga os joelhos ao peito alternadamente em posição de prancha.",
        },
        {
          ex_id: 8,
          ex_nome: "Prancha",
          ex_repeticoes: "3×1 min",
          ex_descricao: "Corpo alinhado, contraia o abdômen e glúteos.",
        },
      ],
    },
  ]);
  const [erro, setErro] = useState(null);

  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  const [modalTreinoAtivo, setModalTreinoAtivo] = useState(null);

  // 🔄 Carregar treinos do backend (Comentado para usar mock com descrições)
  /*
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
  */

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

  const iniciarTreino = (treino) => {
    setModalTreinoAtivo(treino);
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
