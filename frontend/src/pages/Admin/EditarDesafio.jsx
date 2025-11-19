// src/pages/admin/modals/EditDesafio.jsx
import React, { useState, useEffect } from "react";
import "../../styles/pages/admin/forms.scss";

export default function EditDesafio({ desafio, onClose, onSave }) {
  const [form, setForm] = useState({ ...desafio });

  useEffect(() => setForm({ ...desafio }), [desafio]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Editar Desafio</h3>
          <form onSubmit={submit}>
            <div className="form-group">
              <label>Nome</label>
              <input name="nome" value={form.nome} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label>Tipo</label>
                <select name="tipo" value={form.tipo} onChange={handleChange}>
                  <option>Frequência</option>
                  <option>Cardio</option>
                  <option>Nutrição</option>
                </select>
              </div>
              <div style={{ width: 140 }}>
                <label>Duração</label>
                <input
                  name="duracao"
                  value={form.duracao}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-cancelar" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn-salvar">
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
