import React, { useState } from "react";
import "../../styles/pages/professor/mensagensProf.scss";

export default function MensagensProf() {
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
          Todos
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
            <span>FM</span>
          </div>
          <div className="message-content">
            <div className="message-header">
              <h3 className="message-name">Filipe Melo</h3>
            </div>
          </div>
          <div className="unread-badge">
            <span>2</span>
          </div>
        </div>

        {/* Message 2 - Personal Thiago */}
        <div className="message-item">
          <div className="message-avatar orange">
            <span>FE</span>
          </div>
          <div className="message-content">
            <div className="message-header">
              <h3 className="message-name">Felipe Evangelista</h3>
            </div>
          </div>
        </div>

        {/* Message 3 - Nutricionista Alessandra */}
        <div className="message-item">
          <div className="message-avatar blue">
            <span>TW</span>
          </div>
          <div className="message-content">
            <div className="message-header">
              <h3 className="message-name">Thiago William</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
