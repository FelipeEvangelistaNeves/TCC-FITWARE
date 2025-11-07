import React, { useState, useEffect } from "react";
import "./../../styles/pages/aluno/configModal.scss";

export default function ContaProf({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cargo: "",
  });

  // 🔹 Buscar dados do professor ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:3000/api/professor/me", {
        method: "GET",
        credentials: "include", // inclui o cookie com o token
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao buscar dados do professor");
          return res.json();
        })
        .then((data) => {
          setFormData({
            nome: data.nome || "",
            email: data.email || "",
            telefone: data.telefone || "",
          });
        })
        .catch((err) => console.error("Erro ao carregar dados:", err));
    }
  }, [isOpen]);

  // 🔹 Atualizar estado local ao digitar
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Enviar alterações ao backend

  const [msg, setMsg] = useState("");

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/professor/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erro ao atualizar dados.");
      setMsg("Informações atualizadas com sucesso!");
      onClose();
    } catch (err) {
      console.error(err);
      setMsg("Erro ao salvar alterações.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="aluno-prof-config-modal">
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="config-modal account">
        <h2>Configurações da Conta (Professor)</h2>

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

        <div className="msg">
          <p>{msg}</p>
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
