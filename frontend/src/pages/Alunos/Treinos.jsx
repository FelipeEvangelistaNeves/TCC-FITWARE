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
        {/* Cards de treino */}
        {treinosFiltrados.map((treino) => (
          <div className="workout-card" key={treino.tr_id}>
            <div className="workout-header">
              <div className="workout-info">
                <h3>{treino.titulo}</h3>
                <p className="workout-details">{treino.nivel}</p>
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
