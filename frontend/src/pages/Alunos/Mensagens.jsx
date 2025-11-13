import React, { useState } from "react";
import "../../styles/pages/aluno/mensagensAluno.scss";
import ChatModal from "../../pages/Professor/ModalMensagemProf";

export default function MensagensProf() {
  const [activeTab, setActiveTab] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // ===== Declare `messages` antes de qualquer uso =====
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

  // ===== Toggle favorito =====
  const toggleFavorite = (id, e) => {
    // evitar que o clique no botão de favorito abra o modal
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();

    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, favorite: !msg.favorite } : msg))
    );
  };

  // ===== Filtragem — versão segura =====
  const filteredMessages = messages.filter((msg) => {
    const name = msg && msg.name ? String(msg.name).toLowerCase() : "";
    const preview = msg && msg.preview ? String(msg.preview).toLowerCase() : "";
    const search = searchTerm ? String(searchTerm).toLowerCase() : "";

    const matchesSearch = name.includes(search) || preview.includes(search);

    if (activeTab === "nao-lidas") {
      return (msg.unread > 0) && matchesSearch;
    }

    if (activeTab === "favoritas") {
      return (msg.favorite === true) && matchesSearch;
    }

    return matchesSearch;
  });

  // ===== Abrir / fechar chat =====
  const openChat = (contact) => {
    // console.log("Abrindo chat com:", contact); // descomente para debugar
    setSelectedContact(contact);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setSelectedContact(null);
  };

  return (
    <div className="mensagens-aluno">
      {/* ===== Search Bar ===== */}
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

      {/* ===== Filter Tabs ===== */}
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

      {/* ===== Messages List ===== */}
      <div className="messages-list">
        {filteredMessages.length === 0 ? (
          <div className="no-messages">Nenhuma mensagem encontrada.</div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              className="message-item"
              key={msg.id}
              onClick={() => openChat(msg)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") openChat(msg);
              }}
            >
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

              <div
                className="message-actions"
                onClick={(e) => {
                  // evita a propagação do clique para o item inteiro
                  e.stopPropagation();
                }}
              >
                {msg.unread > 0 && (
                  <div className="unread-badge">
                    <span>{msg.unread}</span>
                  </div>
                )}
                <i
                  className={`favorite-btn ${msg.favorite ? "bi bi-star-fill" : "bi bi-star"}`}
                  onClick={(e) => toggleFavorite(msg.id, e)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* ===== Modal do Chat ===== */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={closeChat}
        contactName={selectedContact ? selectedContact.name : null}
        messages={messages}
      />
    </div>
  );
}
