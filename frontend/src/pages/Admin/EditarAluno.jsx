import React, { useState } from "react";
import "../../styles/pages/admin/forms.scss";

export default function EditarAluno({ aluno, onClose, onSave }) {
  const [form, setForm] = useState(aluno);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card"
          onClick={(e) => e.stopPropagation()}>
          <h3>Editar Aluno</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome do Aluno</label>
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Turma</label>
              <input
                name="turma"
                value={form.turma}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Observações</label>
              <textarea
                name="obs"
                value={form.obs || ""}
                onChange={handleChange}
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
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
