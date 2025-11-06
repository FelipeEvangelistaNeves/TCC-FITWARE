import React, { useState } from "react";
import "./../../styles/pages/aluno/configModal.scss";

export default function ContaModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Salvando alterações:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="aluno-prof-config-modal">
        <div className="modal-overlay" onClick={onClose}></div>

        <div className="config-modal account">
          <h2>Configurações da Conta</h2>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Sobrenome</label>
            <input
              type="text"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="modal-actions">
            <button className="btn cancel" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn save" onClick={handleSave}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
