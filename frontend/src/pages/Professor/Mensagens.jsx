import React, { useEffect, useState } from "react";
import "../../styles/pages/aluno/mensagensAluno.scss";
import ChatModal from "../../pages/Professor/ModalMensagemProf";

export default function MensagensProf() {
  const [messages, setMessages] = useState([]); // <-- ESSENCIAL
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todas");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [erro, setErro] = useState("");

  // === Fetch conversas ===
  useEffect(() => {
    const fetchConversas = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/professor/conversas", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Erro ao buscar conversas");

        const data = await res.json();
        console.log("Conversas recebidas:", data);

        if (!Array.isArray(data.conversas)) {
          console.error("Formato inválido:", data);
          return;
        }

        const normalizadas = data.conversas.map((c) => {
          const aluno = c.Aluno || {};

          const nome = aluno.al_nome || "";
          const iniciais = nome
            ? nome
                .split(" ")
                .map((p) => p[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()
            : "??";

          return {
            id: c.co_id,
            name: aluno.al_nome,
            initials: iniciais,
            preview: "Clique para abrir a conversa",
            time: "",
            unread: 0,
            favorite: false,
            color: "default",
          };
        });

        setMessages(normalizadas);
      } catch (error) {
        console.error(error);
        setErro("Erro ao carregar conversas");
      }
    };

    fetchConversas();
  }, []);

  // === Toggle favorito ===
  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, favorite: !msg.favorite } : msg
      )
    );
  };

  // === Filtrar conversas ===
  const filteredMessages = messages.filter((msg) => {
    const name = msg.name?.toLowerCase() || "";
    const preview = msg.preview?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    const matches = name.includes(search) || preview.includes(search);

    if (activeTab === "nao-lidas") return msg.unread > 0 && matches;
    if (activeTab === "favoritas") return msg.favorite && matches;

    return matches;
  });

  // === Abrir chat ===
  const openChat = (contact) => {
    setSelectedContact(contact);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setSelectedContact(null);
  };

  return (
    <div className="mensagens-aluno">
      {/* Search */}
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

      {/* Tabs */}
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

      {/* Lista */}
      <div className="messages-list">
        {filteredMessages.length === 0 ? (
          <div className="no-messages">Nenhuma conversa encontrada.</div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              className="message-item"
              key={msg.id}
              onClick={() => openChat(msg)}
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
                onClick={(e) => e.stopPropagation()}
              >
                {msg.unread > 0 && (
                  <div className="unread-badge">
                    <span>{msg.unread}</span>
                  </div>
                )}

                <i
                  className={
                    msg.favorite ? "bi bi-star-fill favorite-btn" : "bi bi-star"
                  }
                  onClick={(e) => toggleFavorite(msg.id, e)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={closeChat}
        contactName={selectedContact?.name || null}
        messages={messages}
      />
    </div>
  );
}