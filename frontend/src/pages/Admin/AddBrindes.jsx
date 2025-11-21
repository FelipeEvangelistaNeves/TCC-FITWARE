import React, { useState } from "react";
import "../../styles/pages/admin/forms.scss";

export default function AddBrinde({ onClose, onSave }) {
  const [form, setForm] = useState({
    nome: "",
    pontos: "",
    estoque: "",
    status: "disponivel",
    descricao: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="admin-brindes-page">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Criar Novo Brinde</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome</label>
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Pontos</label>
              <input
                type="number"
                name="pontos"
                value={form.pontos}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Estoque</label>
              <input
                type="number"
                name="estoque"
                value={form.estoque}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
              />
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-cancelar" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn-salvar">
                Criar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
