import React, { useEffect, useState } from "react";
import "../../styles/pages/professor/mensagensProf.scss";
import ChatModal from "../../pages/Professor/ModalMensagemProf";

export default function MensagensProf() {
  const [conversas, setConversas] = useState([]);
  const [filteredConversas, setFilteredConversas] = useState([]);
  const [mensagensDaConversa, setMensagensDaConversa] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [activeTab, setActiveTab] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [erro, setErro] = useState("");

  // =============================
  // BUSCAR TODAS AS CONVERSAS
  // =============================
  useEffect(() => {
    const fetchConversas = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/professor/conversas`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Erro ao buscar conversas");

        const data = await res.json();

        const getRandomColor = () => {
          const colors = ["purple", "orange", "blue"];
          return colors[Math.floor(Math.random() * colors.length)];
        };

        const normalizadas = data.conversas.map((c) => {
          const aluno = c.Aluno || {};
          const nome = aluno.al_nome || "";

          const initials = nome
            .split(" ")
            .map((p) => p[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();

          return {
            id: c.co_id,
            name: nome,
            initials,
            preview: "Clique para ver a conversa",
            time: "",
            unread: 0,
            favorite: false,
            color: getRandomColor(),
          };
        });

        setConversas(normalizadas);
        setFilteredConversas(normalizadas);
      } catch (err) {
        console.error(err);
        setErro("Erro ao carregar conversas");
      }
    };

    fetchConversas();
  }, []);

  // =============================
  // ABRIR CHAT E CARREGAR MENSAGENS
  // =============================
  const openChat = async (co_id) => {
    try {
      console.log("Abrindo chat ID:", co_id);

      const res = await fetch(
        `http://localhost:3000/api/professor/mensagens/${co_id}`,
        { credentials: "include" }
      );

      if (!res.ok) throw new Error("Erro ao carregar mensagens");

      const data = await res.json();

      // Normalizar mensagens
      const normalizadas = data.mensagens.map((m) => ({
        ...m,
        tipo:
          m.remetente_tipo.toLowerCase() === "professor"
            ? "enviada"
            : "recebida",
      }));

      console.log(normalizadas);
      setMensagensDaConversa(normalizadas);
      setSelectedContact(conversas.find((c) => c.id === co_id));
      setSelectedChatId(co_id);
    } catch (err) {
      console.error("Erro ao abrir chat:", err);
      setErro("Erro ao carregar mensagens");
    }
  };

  // =============================
  // ENVIAR MENSAGEM
  // =============================
  const enviarMensagem = async (texto) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/professor/mensagens/${selectedChatId}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conteudo: texto }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao enviar mensagem");

      const msg = data.novaMensagem;

      // normalização para encaixar no formato do front
      const mensagemFormatada = {
        me_id: msg.me_id,
        me_conteudo: msg.me_conteudo,
        me_tempo: msg.me_tempo,
        remetente_id: msg.remetente_id,
        remetente_tipo: msg.remetente_tipo,
        tipo: "enviada",
      };

      // adiciona no estado
      setMensagensDaConversa((prev) => [...prev, mensagemFormatada]);
    } catch (err) {
      console.error("Erro ao enviar:", err);
    }
  };

  // =============================
  // FILTRAGEM DE CONVERSAS
  // =============================
  useEffect(() => {
    const search = searchTerm.toLowerCase();

    const filtradas = conversas.filter((msg) => {
      const nome = msg.name.toLowerCase();
      const preview = msg.preview.toLowerCase();

      const matches = nome.includes(search) || preview.includes(search);

      if (activeTab === "favoritas") return msg.favorite && matches;
      if (activeTab === "nao-lidas") return msg.unread > 0 && matches;

      return matches;
    });

    setFilteredConversas(filtradas);
  }, [searchTerm, activeTab, conversas]);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setConversas((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, favorite: !msg.favorite } : msg
      )
    );
  };

  return (
    <div className="mensagens-prof">
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
        {filteredConversas.length === 0 ? (
          <div className="no-messages">Nenhuma conversa encontrada.</div>
        ) : (
          filteredConversas.map((msg) => (
            <div
              key={msg.id}
              className="message-item"
              onClick={() => openChat(msg.id)}
            >
              <div className={`message-avatar ${msg.color}`}>
                <span>{msg.initials}</span>
              </div>

              <div className="message-content">
                <div className="message-top">
                  <h3 className="message-name">{msg.name}</h3>
                  <span className="message-time">{msg.time}</span>
                </div>

                <div className="message-bottom">
                  <p className="message-preview">{msg.preview}</p>
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
                        msg.favorite
                          ? "bi bi-star-fill favorite-btn"
                          : "bi bi-star"
                      }
                      onClick={(e) => toggleFavorite(msg.id, e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <ChatModal
        isOpen={selectedChatId !== null}
        onClose={() => setSelectedChatId(null)}
        contactName={selectedContact?.name}
        mensagens={mensagensDaConversa}
        onSendMessage={enviarMensagem}
      />
    </div>
  );
}
