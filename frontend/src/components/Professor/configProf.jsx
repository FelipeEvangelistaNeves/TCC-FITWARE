import React, { useState } from "react";
import "./../../styles/pages/aluno/configModal.scss";
import ContaProf from "./contaProf";
import TermosModal from "../Alunos/TermosModal";
import { Hand } from "lucide-react";

export default function ConfigProf({ isOpen, onClose }) {
  const [lightMode, setLightMode] = useState(false);
  const [showContaProf, setShowContaProf] = useState(false);

  const [showTermosModal, setShowTermosModal] = useState(false);

  async function handleLogout() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.clear();
        window.location.href = "/"; // redireciona pro login
      }
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  }

  const handleToggleTheme = () => {
    setLightMode(!lightMode);
    document.body.classList.toggle("light-mode", !lightMode);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="aluno-prof-config-modal">
        <div className="modal-overlay" onClick={onClose}></div>

        <div className="config-modal">
          <h2>Configurações</h2>

          <div className="config-option" onClick={() => setShowContaProf(true)}>
            <span>Configurações Gerais</span>
            <i className="bi bi-chevron-right"></i>
          </div>

          <div className="config-option">
            <span>Modo Claro</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={lightMode}
                onChange={handleToggleTheme}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div
            className="config-option"
            onClick={() => setShowTermosModal(true)}
          >
            <span>Termos de Uso</span>
            <i className="bi bi-chevron-right"></i>
          </div>

          <div className="config-option logout" onClick={handleLogout}>
            <span>Sair</span>
            <i className="bi bi-box-arrow-right"></i>
          </div>
        </div>

        <ContaProf
          isOpen={showContaProf}
          onClose={() => setShowContaProf(false)}
        />
        <TermosModal
          isOpen={showTermosModal}
          onClose={() => setShowTermosModal(false)}
        />
      </div>
    </>
  );
}
