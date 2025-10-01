import React from "react";
import "../../styles/pages/aluno/dashboardAluno.scss";
import "../../styles/pages/aluno/mensagensAluno.scss";
import { Bell } from "lucide-react";

export default function TreinoAluno() {
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

        {/* Funcional Workout Card */}
        <div className="workout-card">
          <div className="workout-header">
            <div className="workout-info">
              <h3>Treino Funcional</h3>
              <p className="workout-details">Avançado • 60 min</p>
            </div>
          </div>

          <div className="exercises-list">
            <div className="exercise-item">
              <span className="exercise-number">1</span>
              <span className="exercise-name">Burpees</span>
              <span className="exercise-sets">3×15</span>
            </div>
            <div className="exercise-item">
              <span className="exercise-number">2</span>
              <span className="exercise-name">Mountain Climbers</span>
              <span className="exercise-sets">3×20</span>
            </div>
            <div className="exercise-item">
              <span className="exercise-number">3</span>
              <span className="exercise-name">Prancha</span>
              <span className="exercise-sets">3×1 min</span>
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
