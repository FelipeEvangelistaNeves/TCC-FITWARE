import { useState, useRef, useEffect } from "react";
import "../../styles/pages/professor/chatModal.scss";

export default function ChatModal({ isOpen,
  onClose,
  contactName,
  mensagens = [],
  onSendMessage
 }) {
  // const [mensagens, setMensagens] = useState([
  //   { id: 1, texto: "Oi! Tudo bem?", tipo: "recebida" },
  //   { id: 2, texto: "Tudo ótimo! E você?", tipo: "enviada" },
  // ]);
  const [inputValue, setInputValue] = useState("");
  const chatBodyRef = useRef(null);

  // Scroll automático ao abrir ou ao chegar nova mensagem
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

  if (!isOpen) return null;

  return (
    <div className="chat-modal active">
      <div className="chat-window">

        {/* Cabeçalho */}
        <div className="chat-header">
          <span>{contactName || "Conversa"}</span>
          <span className="close" onClick={onClose}>&times;</span>
        </div>

        {/* Corpo */}
        <div className="chat-body" ref={chatBodyRef}>
          
          {mensagens.length === 0 && (
            <div className="no-messages">Nenhuma mensagem ainda.</div>
          )}

          {mensagens.map((msg) => (
            <div
              key={msg.me_id ?? msg.id} 
              className={`msg ${msg.tipo}`} // agora existe tipo
            >
              {msg.me_conteudo}
            </div>
          ))}
        </div>

        {/* Rodapé */}
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Digite uma mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSend}>Enviar</button>
        </div>
      </div>
    </div>
  );
}