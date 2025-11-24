import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/mensagensAluno.scss";
import "../../styles/pages/aluno/dashboardAluno.scss";
import "../../styles/pages/aluno/treinos.scss";
import DetalhesTreino from "./DetalhesTreino";
import EditarTreino from "./EditarTreino";
import NovoTreino from "./NovoTreino";

export default function DashboardAluno() {
  const [treinos, setTreinos] = useState([]);
  const [treinoSelecionado, setTreinoSelecionado] = useState(null);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const [novoTreino, setNovoTreino] = useState(false);
  const [erro, setErro] = useState(null);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // 🔍 filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");

  const fetchTreinos = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/treinos/professor`,
        {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json; charset=utf-8" },
        }
      );

      if (!res.ok) throw new Error("Erro ao buscar treinos do aluno");

      const data = await res.json();
      const treinosFormatados = data.map((t) => ({
        tr_id: t.id,
        tr_prof_id: t.tr_prof_id,
        tr_nome: t.nome,
        tr_descricao: t.descricao,
        tr_dificuldade: t.dificuldade,
        tempo: t.tempo,
        Funcionario: { fu_nome: t.funcionario },
        Exercicios: t.exercicios.map((ex) => ({
          ex_nome: ex.nome,
          ex_series: ex.series,
          ex_repeticoes: ex.repeticoes,
          ex_descanso: ex.descanso,
          ex_intrucao: ex.instrucao,
        })),
      }));

      setTreinos(treinosFormatados);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar os treinos.");
    }
  };

  useEffect(() => {
    fetchTreinos();
    obterUsuarioLogado();
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
    // Buscar detalhes completos do treino para incluir alunos e instruções
    const fetchDetalhes = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/treinos/detalhes/${treino.tr_id}`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Erro ao buscar detalhes");
        const data = await res.json();

        // Formatar dados para compatibilidade com DetalhesTreino
        const treinoCompleto = {
          ...treino,
          Exercicios: (data.exercicios || []).map((ex) => ({
            ex_id: ex.id,
            ex_nome: ex.nome,
            ex_series: ex.series,
            ex_repeticoes: ex.repeticoes,
            ex_descanso: ex.descanso,
            ex_intrucao: ex.instrucao,
          })),
          Alunos: data.alunos || [],
        };

        setTreinoSelecionado(treinoCompleto);
        setMostrarDetalhes(true);
      } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
        setTreinoSelecionado(treino);
        setMostrarDetalhes(true);
      }
    };

    fetchDetalhes();
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

  const obterUsuarioLogado = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/professor/me`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUsuarioLogado(data);
      }
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error);
    }
  };

  const deletarTreino = async (treinoId, treinoProfId) => {
    // Verificar se o treino pertence ao professor logado
    if (usuarioLogado?.fu_id !== treinoProfId) {
      alert(
        "Você não pode excluir treinos de outros professores ou da academia."
      );
      return;
    }

    if (!window.confirm("Tem certeza que deseja excluir este treino?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/treinos/${treinoId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erro ao deletar treino");
      }

      setTreinos((prev) => prev.filter((t) => t.tr_id !== treinoId));
      alert("Treino excluído com sucesso!");
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao excluir treino");
    }
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
        {/* Cards de Treino */}
        {treinosFiltrados.length === 0 ? (
          <p>Nenhum treino encontrado.</p>
        ) : (
          treinosFiltrados.map((treino) => (
            <div className="workout-card" key={treino.tr_id}>
              <div className="workout-header">
                <div className="workout-info">
                  <h3>{treino.tr_nome}</h3>
                  <span className="workout-dificuldade">
                    {treino.tr_dificuldade}
                  </span>
                </div>
                {usuarioLogado?.fu_id === treino.tr_prof_id && (
                  <button
                    className="delete-btn"
                    title="Excluir treino"
                    onClick={() =>
                      deletarTreino(treino.tr_id, treino.tr_prof_id)
                    }
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                )}
              </div>

              <div className="exercises-list">
                {treino.Exercicios?.map((ex, index) => (
                  <div className="exercise-item" key={index}>
                    <span className="exercise-number">{index + 1}</span>
                    <span className="exercise-name">{ex.ex_nome}</span>
                    <span className="exercise-sets">
                      {ex.ex_series}x{ex.ex_repeticoes}
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

      {novoTreino && treinoSelecionado && (
        <EditarTreino
          treino={treinoSelecionado}
          onClose={fecharNovoTreino}
          onSaved={fetchTreinos}
        />
      )}

      {novoTreino && treinoSelecionado === null && (
        <NovoTreino onClose={fecharNovoTreino} onSaved={fetchTreinos} />
      )}
    </div>
  );
}
