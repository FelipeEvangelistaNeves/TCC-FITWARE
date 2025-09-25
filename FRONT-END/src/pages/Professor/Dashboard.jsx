import React from "react";
import "../../styles/pages/professor/dashboardprof.scss";

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Header */}

      {/* Summary Cards */}
      <section className="summary-cards">
        <div className="summary-card">
          <h3>Alunos</h3>
          <div className="card-number">42</div>
          <div className="card-subtitle">+3</div>
        </div>
        <div className="summary-card">
          <h3>Treinos</h3>
          <div className="card-number">156</div>
          <div className="card-subtitle">12</div>
        </div>
        <div className="summary-card">
          <h3>Mensagens</h3>
          <div className="card-number">89</div>
          <div className="card-subtitle">24</div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="quick-actions-section">
        <h2>Ações Rápidas</h2>
        <div className="actions-grid">
          <div className="action-card">
            <i className="fas fa-users"></i>
            <span>Alunos</span>
          </div>
          <div className="action-card">
            <i className="fas fa-dumbbell"></i>
            <span>Treinos</span>
          </div>
          <div className="action-card">
            <i className="fas fa-comment"></i>
            <span>Mensagens</span>
          </div>
          <div className="action-card highlighted">
            <i className="fas fa-clock"></i>
            <span>Histórico</span>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="recent-activity-section">
        <div className="section-header">
          <h2>Atividade Recente</h2>
          <button className="see-all-btn">Ver Tudo</button>
        </div>

        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-avatar">M</div>
            <div className="activity-content">
              <div className="activity-title">Treino enviado para Maria</div>
              <div className="activity-time">Hoje, 14:30</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-avatar">T</div>
            <div className="activity-content">
              <div className="activity-title">Mensagem para Turma Segunda</div>
              <div className="activity-time">Hoje, 10:15</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-avatar">C</div>
            <div className="activity-content">
              <div className="activity-title">Novo aluno: Carlos Mendes</div>
              <div className="activity-time">Ontem, 16:45</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
