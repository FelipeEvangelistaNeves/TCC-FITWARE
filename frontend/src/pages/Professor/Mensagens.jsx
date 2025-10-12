import React, { useState } from "react";
import "../../styles/pages/aluno/mensagensAluno.scss";

export default function MensagensAluno() {
  const [activeTab, setActiveTab] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Personal Felipe",
      initials: "PF",
      color: "purple",
      time: "10:30",
      preview: "Como está indo o treino de força?",
      unread: 2,
      favorite: false,
    },
    {
      id: 2,
      name: "Personal Thiago",
      initials: "PT",
      color: "orange",
      time: "Ontem",
      preview: "Mesmo horário amanhã?",
      unread: 0,
      favorite: true,
    },
    {
      id: 3,
      name: "Nutricionista Alessandra",
      initials: "NA",
      color: "blue",
      time: "Seg",
      preview: "Tudo OK para a consulta de terça-feira?",
      unread: 0,
      favorite: false,
    },
  ]);

  // Toggle favorito
  const toggleFavorite = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, favorite: !msg.favorite } : msg
      )
    );
  };

  // Filtragem
  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.preview.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "nao-lidas") {
      return msg.unread > 0 && matchesSearch;
    }
    if (activeTab === "favoritas") {
      return msg.favorite && matchesSearch;
    }
    return matchesSearch;
  });

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        {filteredMessages.map((msg) => (
          <div className="message-item" key={msg.id}>
            <div className={`message-avatar ${msg.color}`}>
              <span>{msg.initials}</span>
            </div>
            <div className="message-content">
              <div className="message-header">
                <h3 className="message-name">{msg.name}</h3>
                <span className="message-time">{msg.time}</span>
              </div>
              <p className="message-preview">{msg.preview}</p>
            </div>
            <div className="message-actions">
              {msg.unread > 0 && (
                <div className="unread-badge">
                  <span>{msg.unread}</span>
                </div>
              )}
              <i
                className={`favorite-btn ${msg.favorite ? "bi bi-star-fill" : "bi bi-star"}`}
                onClick={() => toggleFavorite(msg.id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
