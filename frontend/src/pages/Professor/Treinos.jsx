import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/mensagensAluno.scss";
import "../../styles/pages/aluno/dashboardAluno.scss";
import "../../styles/pages/aluno/treinos.scss";
import DetalhesTreino from "./DetalhesTreino";
import EditarTreino from "./EditarTreino";

export default function DashboardAluno() {
  const [treinos, setTreinos] = useState([]);
  const [treinoSelecionado, setTreinoSelecionado] = useState(null);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const [novoTreino, setNovoTreino] = useState(false);
  const [erro, setErro] = useState(null);

  // 🔍 filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");

  useEffect(() => {
    const fetchTreinos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/treinos", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Erro ao buscar treinos");

        const data = await res.json();
        setTreinos(data);
      } catch (error) {
        console.error(error);
        setErro("Erro ao carregar treinos");
      }
    };

    fetchTreinos();
  }, []);

  if (erro) return <p>{erro}</p>;

  // 📌 FUNÇÃO DE FILTRAGEM FINAL
  const treinosFiltrados = treinos.filter((treino) => {
    const texto = searchTerm.toLowerCase();

    const nomeMatch = treino.tr_nome?.toLowerCase().includes(texto);
    const descMatch = treino.tr_descricao?.toLowerCase().includes(texto);

    const exerciciosMatch = treino.Exercicios?.some((ex) =>
      ex.ex_nome.toLowerCase().includes(texto)
    );

    const categoriaMatch =
      filtroCategoria === "Todos" ||
      treino.tr_categoria?.toLowerCase() === filtroCategoria.toLowerCase();

    return (nomeMatch || descMatch || exerciciosMatch) && categoriaMatch;
  });

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filtros */}
      <section className="workouts-section">
        <div className="section-header">
          {["Todos", "Força", "Cardio", "Funcional"].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${
                filtroCategoria === cat ? "active" : ""
              }`}
              onClick={() => setFiltroCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards de Treino */}
        {treinosFiltrados.length === 0 ? (
          <p>Nenhum treino encontrado.</p>
        ) : (
          treinosFiltrados.map((treino) => (
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
