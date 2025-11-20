// src/pages/Admin/AddProfessor.jsx
import React, { useState } from "react";
import "../../styles/pages/admin/forms.scss";

export default function AddProfessor({ onClose, onSave }) {
  const [form, setForm] = useState({
    fu_nome: "",
    fu_email: "",
    fu_senha: "",
    fu_cpf: "",
    fu_telefone: "",
    fu_dtnasc: "",
    fu_cargo: "Professor",
    fu_cref: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.fu_nome ||
      !form.fu_email ||
      !form.fu_senha ||
      !form.fu_cpf ||
      !form.fu_dtnasc
    ) {
      alert("Preencha os campos obrigatórios.");
      return;
    }
    onSave(form);
  };

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Adicionar Novo Professor</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome *</label>
              <input
                name="fu_nome"
                value={form.fu_nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="fu_email"
                value={form.fu_email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Senha *</label>
              <input
                type="password"
                name="fu_senha"
                value={form.fu_senha}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>CPF *</label>
              <input
                name="fu_cpf"
                value={form.fu_cpf}
                onChange={handleChange}
                maxLength={11}
                required
              />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input
                name="fu_telefone"
                value={form.fu_telefone}
                onChange={handleChange}
                maxLength={11}
              />
            </div>

            <div className="form-group">
              <label>Data de Nascimento *</label>
              <input
                type="date"
                name="fu_dtnasc"
                value={form.fu_dtnasc}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>CREF</label>
              <input
                name="fu_cref"
                value={form.fu_cref}
                onChange={handleChange}
              />
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-cancelar" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn-salvar">
                Adicionar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
