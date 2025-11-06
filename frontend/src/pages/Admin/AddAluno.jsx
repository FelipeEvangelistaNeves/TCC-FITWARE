import React, { useState } from "react";
import "../../styles/pages/admin/forms.scss";

export default function AddAluno({ onClose, onSave }) {
  const [form, setForm] = useState({
    nome: "",
    turma: "",
    status: "Ativo",
    observacoes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.turma) return;
    onSave(form);
  };

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card"
          onClick={(e) => e.stopPropagation()}>
          <h3>Adicionar Novo Aluno</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome do Aluno</label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Ex: Maria Silva"
                required
              />
            </div>

            <div className="form-group">
              <label>Turma</label>
              <input
                type="text"
                name="turma"
                value={form.turma}
                onChange={handleChange}
                placeholder="Ex: Funcional"
                required
              />
            </div>

            <div className="form-group">
              <label>Observações</label>
              <textarea
                name="observacoes"
                value={form.observacoes}
                onChange={handleChange}
                placeholder="Ex: Aluna nova na academia"
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
