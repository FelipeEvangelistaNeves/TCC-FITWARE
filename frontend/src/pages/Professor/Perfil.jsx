import React from "react";
import "../../styles/pages/professor/perfilprof.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function PerfilProf() {
  return (
    <div className="perfil-container roxo">
      {/* Cabeçalho */}
      <div className="perfil-header">
        <h2>Meu Perfil</h2>
        <i className="bi bi-gear"></i>
      </div>

      {/* Informações principais */}
      <div className="perfil-info">
        <div className="perfil-avatar">JP</div>
        <h3>João Paulo</h3>
        <p>Personal Trainer</p>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">42</span>
            <span className="stat-label">Alunos</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">156</span>
            <span className="stat-label">Treinos</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">89</span>
            <span className="stat-label">Mensagens</span>
          </div>
        </div>
      </div>

      {/* Conteúdo do Perfil */}
      <div className="perfil-content">
        {/* Informações Pessoais */}
        <div className="card perfil-card">
          <div className="card-header-between">
            <h4>Informações Pessoais</h4>
            <i className="bi bi-pencil"></i>
          </div>
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
                <span className="tag">Musculação</span>
                <span className="tag">Funcional</span>
                <span className="tag">Cardio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Atividade Recente */}
        <div className="card perfil-card">
          <div className="card-header-between">
            <h4>Atividade Recente</h4>
            <i className="bi bi-clock-history"></i>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-title">
                <i className="bi bi-send"></i> Treino enviado para Maria Silva
              </div>
              <div className="activity-time">Hoje, 10:30</div>
            </div>
            <div className="activity-item">
              <div className="activity-title">
                <i className="bi bi-chat-dots"></i> Mensagem para Turma Segunda
              </div>
              <div className="activity-time">Hoje, 09:15</div>
            </div>
            <div className="activity-item">
              <div className="activity-title">
                <i className="bi bi-person-plus"></i> Novo aluno: Carlos Mendes
              </div>
              <div className="activity-time">Ontem, 16:45</div>
            </div>
          </div>
        </div>

        {/* Certificações */}
        <div className="card perfil-card">
          <div className="card-header-between">
            <h4>Certificações</h4>
            <a href="#">Ver Todas</a>
          </div>
          <div className="cert-list">
            <div className="cert-item">
              <i className="bi bi-award"></i>
              <div>
                <p className="cert-titulo">
                  CREF - Conselho Regional de Educação Física
                </p>
                <p className="cert-detalhe">Nº 123456-6/SP</p>
              </div>
            </div>
            <div className="cert-item">
              <i className="bi bi-mortarboard"></i>
              <div>
                <p className="cert-titulo">
                  Especialização em Treinamento Funcional
                </p>
                <p className="cert-detalhe">
                  Universidade do Esporte - 2020
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}
