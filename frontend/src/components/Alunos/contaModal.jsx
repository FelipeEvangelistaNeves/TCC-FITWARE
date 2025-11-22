import React, { useState, useEffect } from "react";
import "./../../styles/pages/aluno/configModal.scss";

export default function ContaModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "", });

  // Buscar dados do aluno logado
  useEffect(() => {
    if (isOpen) {
      fetch(`${import.meta.env.VITE_BASE_URL}/aluno/me`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            nome: data.nome || "",
            email: data.email || "",
            telefone: data.telefone || "",
          });
        })
        .catch((err) => console.error("Erro ao carregar dados do aluno:", err));
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/aluno/update`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao atualizar aluno.");

      alert("Informações atualizadas com sucesso!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar alterações.");
    }
  };

  if (!isOpen) return null;

  return (
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
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Telefone</label>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
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
  );
}
