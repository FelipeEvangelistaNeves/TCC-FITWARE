import React, { useState, useRef, useEffect } from "react";
import "../../styles/pages/professor/chatModal.scss";

export default function ChatModal({ isOpen, onClose, contactName }) {
  const [mensagens, setMensagens] = useState([
    { id: 1, texto: "Oi! Tudo bem?", tipo: "recebida" },
    { id: 2, texto: "Tudo ótimo! E você?", tipo: "enviada" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(()=> {
    const openChat = async (co_id) => {
      const res = await fetch(
        `http://localhost:3000/api/professor/conversas/${co_id}/mensagens`,
        { credentials: "include" }
      );
    
      const data = await res.json();
      setMensagens(data.mensagens);
    };

    openChat($co_id);
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [mensagens, isOpen]);

  useEffect(() => {
    const handleSize = () => {
      const viewportHeight = window.innerHeight;
      const windowHeight = document.documentElement.clientHeight;
      
      if(viewportHeight < windowHeight -100){
        chatFooterRef.current?.scrollIntoView({ behavior: 'smooth'});
      }

    };
  
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, []);


  const handleSendMessage = () => {
    const texto = inputValue.trim();
    if (!texto) return;

    setMensagens((prev) => [
      ...prev,
      { id: prev.length + 1, texto, tipo: "enviada" },
    ]);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-modal active">
      <div className="chat-window">
        {/* ===== Cabeçalho ===== */}
        <div className="chat-header">
          <span>{contactName || "Sem contato"}</span>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>

        {/* ===== Corpo do chat ===== */}
        <div className="chat-body" ref={chatBodyRef}>
          {mensagens.map((msg) => (
            <div key={msg.id} className={`msg ${msg.tipo}`}>
              {msg.texto}
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
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  );
}
