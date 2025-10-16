import React from "react";
import "../../styles/pages/aluno/mensagensAluno.scss";
import "../../styles/pages/aluno/dashboardAluno.scss";
import "../../styles/pages/professor/treinosprof.scss";
import { Bell } from "lucide-react";
import { useState, useEffect } from "react";

export default function DashboardAluno() {
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchTreinos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/treinos", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Erro ao buscar treinos"); // colocar logger message depois

        const data = await res.json();
        setTreinos(data);
      } catch (error) {
        console.error(error);
        setErro("Erro ao carregar treinos"); // colocar logger message depois
      } finally {
        setLoading(false);
      }
    };

    fetchTreinos();
  }, []); // executa apenas 1x ao montar o componente
  // colocar logger message depois
  if (erro) return <p>{erro}</p>;

  return (
    <div className="dashboard-aluno">
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Buscar mensagem..."
            className="search-input"
          />
        </div>
      </div>
      {/* Workouts Section */}
      <section className="workouts-section">
        <div className="section-header">
          <button className="filter-btn">Todos</button>
          <button className="filter-btn">Força</button>
          <button className="filter-btn">Cardio</button>
          <button className="filter-btn">Funcional</button>
        </div>

        {treinos.length === 0 ? (
          <p>Nenhum treino encontrado.</p>
        ) : (
          treinos.map((treino) => (
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
                <button className="start-btn">Iniciar</button>
              </div>

              <div className="treino-actions">
                <div className="btn-atribuir">Atribuir</div>
                <div className="btn-detalhes">Detalhes</div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

{
  /* Bottom Navigation */
}
<>
  <nav className="bottom-nav">
    <div className="nav-item">
      <i className="fas fa-home"></i>
      <span>Início</span>
    </div>
    <div className="nav-item">
      <i className="fas fa-users"></i>
      <span>Alunos</span>
    </div>
    <div className="nav-item active">
      <i className="fas fa-dumbbell"></i>
      <span>Treinos</span>
    </div>
    <div className="nav-item">
      <i className="fas fa-comment"></i>
      <span>Mensagens</span>
    </div>
    <div className="nav-item">
      <i className="fas fa-user"></i>
      <span>Perfil</span>
    </div>
  </nav>
</>;
