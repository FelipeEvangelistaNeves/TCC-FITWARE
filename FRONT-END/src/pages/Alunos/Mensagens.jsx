import React, { useState } from "react";
import "../../styles/pages/aluno/mensagensAluno.scss";

export default function MensagensAluno() {
  const [activeTab, setActiveTab] = useState("todas");

  return (
    <div className="mensagens-aluno">
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

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button
          className={`filter-tab ${activeTab === "todas" ? "active" : ""}`}
          onClick={() => setActiveTab("todas")}
        >
          Todas
        </button>
        <button
          className={`filter-tab ${activeTab === "nao-lidas" ? "active" : ""}`}
          onClick={() => setActiveTab("nao-lidas")}
        >
          Não lidas
        </button>
        <button
          className={`filter-tab ${activeTab === "favoritas" ? "active" : ""}`}
          onClick={() => setActiveTab("favoritas")}
        >
          Favoritas
        </button>
      </div>

      {/* Messages List */}
      <div className="messages-list">
        {/* Message 1 - Personal Felipe */}
        <div className="message-item">
          <div className="message-avatar purple">
            <span>PF</span>
          </div>
          <div className="message-content">
            <div className="message-header">
              <h3 className="message-name">Personal Felipe</h3>
              <span className="message-time">10:30</span>
            </div>
            <p className="message-preview">Como está indo o treino de força?</p>
          </div>
          <div className="unread-badge">
            <span>2</span>
          </div>
        </div>

        {/* Message 2 - Personal Thiago */}
        <div className="message-item">
          <div className="message-avatar orange">
            <span>PT</span>
          </div>
          <div className="message-content">
            <div className="message-header">
              <h3 className="message-name">Personal Thiago</h3>
              <span className="message-time">Ontem</span>
            </div>
            <p className="message-preview">Mesmo horário amanhã?</p>
          </div>
        </div>

        {/* Message 3 - Nutricionista Alessandra */}
        <div className="message-item">
          <div className="message-avatar blue">
            <span>NA</span>
          </div>
          <div className="message-content">
            <div className="message-header">
              <h3 className="message-name">Nutricionista Alessandra</h3>
              <span className="message-time">Seg</span>
            </div>
            <p className="message-preview">
              Tudo OK para a consulta de terça-feira?
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-item">
          <i className="fas fa-home"></i>
          <span>Início</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-dumbbell"></i>
          <span>Treinos</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-clock"></i>
          <span>Desafios</span>
        </div>
        <div className="nav-item active">
          <i className="fas fa-comment"></i>
          <span>Mensagens</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-user"></i>
          <span>Perfil</span>
        </div>
      </nav>
    </div>
  );
}
