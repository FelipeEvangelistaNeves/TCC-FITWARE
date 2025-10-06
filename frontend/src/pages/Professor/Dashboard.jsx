import React from "react";
import "../../styles/pages/professor/dashboardProf.scss";
import { Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardAluno() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-aluno">
      {/* Summary Cards */}
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

      {/* quick actions */}
      <section className="quick-actions">
        <h2>Ações Rápidas</h2>
          <div className="actions-grid">
            <button className="action-card" onClick={() => navigate('/professor/alunos')} >
                <div>
                  <i class="bi bi-person"></i>
                </div>
                <div className="action-label">Alunos</div>
            </button>

            <button className="action-card" onClick={() => navigate('/professor/treinos')} >
              <div>
                <Dumbbell size={22} />
              </div>
              <div className="action-label">Treinos</div>
            </button>

            <button className="action-card" onClick={() => navigate('/professor/mensagens')} >
              <div>
                <i class="bi bi-chat-left-text"></i>
              </div>
              <div className="action-label">Mensagens</div>
            </button>

            <button className="action-card" onClick={() => navigate('/professor/perfil')} >
              <div>
                <i class="bi bi-clock"></i>
              </div>
              <div className="action-label">Histórico</div>
            </button>
          </div>
      </section>

      {/* Workouts Section */}
      <section className="workouts-section">
        <div className="section-header">
          <button className="filter-btn">Todos</button>
          <button className="filter-btn">Força</button>
          <button className="filter-btn">Cardio</button>
          <button className="filter-btn">Funcional</button>
        </div>

        {/* Strength Workout Card */}
        <div className="workout-card">
          <div className="workout-header">
            <div className="workout-info">
              <h3>Treino de Força</h3>
              <p className="workout-details">Intermediário • 45 min</p>
            </div>
          </div>

          <div className="exercises-list">
            <div className="exercise-item">
              <span className="exercise-number">1</span>
              <span className="exercise-name">Agachamento</span>
              <span className="exercise-sets">3×12</span>
            </div>
            <div className="exercise-item">
              <span className="exercise-number">2</span>
              <span className="exercise-name">Supino</span>
              <span className="exercise-sets">3×10</span>
            </div>
            <div className="exercise-item">
              <span className="exercise-number">3</span>
              <span className="exercise-name">Remada</span>
              <span className="exercise-sets">3×10</span>
            </div>
          </div>

          <div className="workout-footer">
            <div className="trainer-info">
              <div className="trainer-avatar">JP</div>
              <span className="trainer-name">João Paulo</span>
            </div>
            <button className="start-btn">Iniciar</button>
          </div>
        </div>

        {/* Cardio Workout Card */}
        <div className="workout-card">
          <div className="workout-header">
            <div className="workout-info">
              <h3>Treino de Cardio</h3>
              <p className="workout-details">Iniciante • 30 min</p>
            </div>
          </div>

          <div className="exercises-list">
            <div className="exercise-item">
              <span className="exercise-number">1</span>
              <span className="exercise-name">Corrida</span>
              <span className="exercise-sets">20 min</span>
            </div>
            <div className="exercise-item">
              <span className="exercise-number">2</span>
              <span className="exercise-name">Pular corda</span>
              <span className="exercise-sets">10 min</span>
            </div>
          </div>

          <div className="workout-footer">
            <div className="trainer-info">
              <div className="trainer-avatar">JP</div>
              <span className="trainer-name">João Paulo</span>
            </div>
            <button className="start-btn">Iniciar</button>
          </div>
        </div>
      </section>
    </div>
  );
}