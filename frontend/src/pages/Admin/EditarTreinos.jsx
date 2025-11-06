import React, { useState } from "react";
import "../../styles/pages/admin/forms.scss";

export default function EditTreino({ treino, onClose, onSave }) {
  const [form, setForm] = useState({ ...treino });

  const handleChange = (campo, valor) => {
    setForm({ ...form, [campo]: valor });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form.id, form);
    onClose();
  };

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card"
          onClick={(e) => e.stopPropagation()}>
          <h3>Editar Treino</h3>

          <div className="form-group">
            <label>Nome</label>
            <input
              value={form.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tipo</label>
            <select
              value={form.tipo}
              onChange={(e) => handleChange("tipo", e.target.value)}>
              <option>Força</option>
              <option>Cardio</option>
              <option>Funcional</option>
              <option>Flexibilidade</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nível</label>
            <select
              value={form.nivel}
              onChange={(e) => handleChange("nivel", e.target.value)}>
              <option>Iniciante</option>
              <option>Intermediário</option>
              <option>Avançado</option>
            </select>
          </div>

          <div className="form-group">
            <label>Duração (min)</label>
            <input
              type="number"
              value={form.duracao}
              onChange={(e) => handleChange("duracao", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}>
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
          </div>

          <div className="modal-actions">
            <button className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn-salvar" onClick={handleSubmit}>
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
