import React, { useState } from "react";
import "../../styles/pages/admin/forms.scss";

export default function AddProfessor({ onClose, onSave }) {
  const [form, setForm] = useState({
    nome: "",
    especialidade: "",
    status: "Ativo",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.especialidade) return;
    onSave(form);
  };

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card"
          onClick={(e) => e.stopPropagation()}>
          <h3>Adicionar Novo Professor</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome do Professor</label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Ex: Lucas Rocha"
                required
              />
            </div>

            <div className="form-group">
              <label>Especialidade</label>
              <input
                type="text"
                name="especialidade"
                value={form.especialidade}
                onChange={handleChange}
                placeholder="Ex: Musculação"
                required
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Ativo</option>
                <option>Inativo</option>
              </select>
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
