// src/pages/admin/modals/AddDesafio.jsx
import React, { useState } from "react";
import "../../styles/pages/admin/forms.scss";

export default function AddDesafio({ onClose, onSave }) {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    tipo: "Frequência",
    pontos: 100,
    status: "Inativo",
    inicio: "",
    fim: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.nome.trim()) {
      return alert("Informe o nome do desafio");
    }

    if (!form.fim) {
      return alert("Informe a data de término do desafio");
    }

    onSave(form);
  };

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Criar Desafio</h3>
          </div>

          <div className="modal-body">
            <form onSubmit={submit} className="form-card">
              <div className="form-group">
                <label>
                  Nome <span className="required">*</span>
                </label>
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Ex: Desafio 7 dias de treino"
                  required
                />
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  name="descricao"
                  value={form.descricao}
                  onChange={handleChange}
                  placeholder="Descreva o objetivo do desafio..."
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tipo / Tag</label>
                  <select name="tipo" value={form.tipo} onChange={handleChange}>
                    <option value="Frequência">Frequência</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Nutrição">Nutrição</option>
                    <option value="Força">Força</option>
                    <option value="Flexibilidade">Flexibilidade</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Pontos</label>
                  <input
                    type="number"
                    name="pontos"
                    value={form.pontos}
                    onChange={handleChange}
                    min="0"
                    step="10"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data de Início</label>
                  <input
                    type="date"
                    name="inicio"
                    value={form.inicio}
                    onChange={handleChange}
                  />
                  <span className="help-text">
                    Deixe em branco para iniciar imediatamente
                  </span>
                </div>

                <div className="form-group">
                  <label>
                    Data de Término <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    name="fim"
                    value={form.fim}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Inativo">Inativo</option>
                  <option value="Ativo">Ativo</option>
                </select>
                <span className="help-text">
                  Desafios "Inativos" podem ser ativados depois
                </span>
              </div>
            </form>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-salvar" onClick={submit}>
              Criar Desafio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
