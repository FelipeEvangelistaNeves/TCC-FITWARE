import React from "react";
import "../../styles/pages/professor/perfilprof.scss";

export default function PerfilProf() {
  return (
    <div>
      

      {/* Conteúdo do Perfil */}
      <div className="perfil-content">
        {/* Informações Principais */}
        <section className="perfil-info">
          <div className="perfil-avatar">JP</div>
          <h2 className="perfil-nome">João Paulo</h2>
          <p className="perfil-cargo">Personal Trainer</p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">42</div>
              <div className="stat-label">Alunos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">156</div>
              <div className="stat-label">Treinos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">89</div>
              <div className="stat-label">Mensagens</div>
            </div>
          </div>
        </section>

        {/* Informações Pessoais */}
        <section className="perfil-section">
          <h3 className="section-title">Informações Pessoais</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">joao.paulo@fitware.com</span>
            </div>
            <div className="info-item">
              <span className="info-label">Telefone</span>
              <span className="info-value">(11) 98765-4321</span>
            </div>
            <div className="info-item">
              <span className="info-label">Especialidades</span>
              <div className="especialidades">
                <span className="especialidade-tag">Musculação</span>
                <span className="especialidade-tag">Funcional</span>
                <span className="especialidade-tag">Cardio</span>
              </div>
            </div>
          </div>
        </section>

        {/* Atividade Recente */}
        <section className="perfil-section">
          <h3 className="section-title">Atividade Recente</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-title">Treino enviado para Maria Silva</div>
              <div className="activity-time">Hoje, 10:30</div>
            </div>
            <div className="activity-item">
              <div className="activity-title">Mensagem para Turma Segunda</div>
              <div className="activity-details">Hoje, 09:15</div>
            </div>
            <div className="activity-item">
              <div className="activity-title">Novo aluno: Carlos Mendes</div>
              <div className="activity-time">Ontem, 16:45</div>
            </div>
          </div>
        </section>

        {/* Certificações */}
        <section className="perfil-section">
          <h3 className="section-title">Certificações</h3>
          <div className="certificacoes-list">
            <div className="certificacao-item">
              <div className="certificacao-titulo">CREF - Conselho Regional de Educação Física</div>
              <div className="certificacao-detalhes">Nº 123456-6/SP</div>
            </div>
            <div className="certificacao-item">
              <div className="certificacao-titulo">Especialização em Treinamento Funcional</div>
              <div className="certificacao-detalhes">Universidade do Esporte - 2020</div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-item">
          <i className="fas fa-home"></i>
          <span>Início</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-users"></i>
          <span>Alunos</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-dumbbell"></i>
          <span>Treinos</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-comment"></i>
          <span>Mensagens</span>
        </div>
        <div className="nav-item active">
          <i className="fas fa-user"></i>
          <span>Perfil</span>
        </div>
      </nav>
    </div>
  );
}