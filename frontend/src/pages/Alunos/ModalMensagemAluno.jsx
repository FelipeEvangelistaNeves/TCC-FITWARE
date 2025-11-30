import React, { useState, useRef, useEffect } from "react";
import "../../styles/pages/professor/chatModal.scss";

export default function ChatModal({
  isOpen,
  onClose,
  contactName,
  contactInitials,
  mensagens = [],
  onSendMessage,
}) {
  const [inputValue, setInputValue] = useState("");
  const chatBodyRef = useRef(null);
  const chatFooterRef = useRef(null);

  // Debug
  useEffect(() => {
    console.log("ChatModal recebeu:", { contactName, contactInitials });
  }, [contactName, contactInitials]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [mensagens, isOpen]);

  useEffect(() => {
    const handleSize = () => {
      const viewportHeight = window.innerHeight;
      const windowHeight = document.documentElement.clientHeight;

      if (viewportHeight < windowHeight - 100) {
        chatFooterRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  const handleSend = () => {
    const texto = inputValue.trim();
    if (!texto) return;

    onSendMessage(texto); // O pai envia de verdade
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  if (!isOpen) return null;

  return (
    <div className="chat-modal full-page active">
      <div className="chat-window">
        {/* ===== Cabeçalho ===== */}
        <div className="chat-header">
          <button className="back-btn" onClick={onClose}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <div className="user-info">
            <div className="avatar-placeholder">
              <span>
                {contactName?.charAt(0)?.toUpperCase() || "?"}
                {contactName?.charAt(1)?.toUpperCase() || "?"}
              </span>
            </div>
            <h3>{contactName || "Conversa"}</h3>
          </div>
          <div className="header-actions">
            <i className="fas fa-ellipsis-v"></i>
          </div>
        </div>

        {/* ===== Corpo do chat ===== */}
        <div className="chat-body" ref={chatBodyRef}>
          {mensagens.length === 0 && (
            <div className="no-messages">Nenhuma mensagem ainda.</div>
          )}
          {mensagens.map((msg, index) => (
            <div
              key={msg.me_id ?? msg.id ?? index}
              className={`msg ${msg.tipo}`}
            >
              {msg.me_conteudo}
            </div>
          ))}
        </div>

        {/* ===== Rodapé ===== */}
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Digite uma mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSend}>
            <i className="bi bi-send"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
