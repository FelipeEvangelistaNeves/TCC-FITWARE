// src/pages/admin/modals/EditarDesafio.jsx
import React, { useState, useEffect } from "react";
import "../../styles/pages/admin/forms.scss";

export default function EditarDesafio({ desafio, onClose, onSave }) {
  const [form, setForm] = useState({
    de_id: "",
    de_nome: "",
    de_descricao: "",
    de_tag: "Frequência",
    de_pontos: 0,
    de_start: "",
    de_end: "",
    de_status: "Inativo",
  });

  useEffect(() => {
    if (desafio) {
      setForm({
        de_id: desafio.de_id || "",
        de_nome: desafio.de_nome || "",
        de_descricao: desafio.de_descricao || "",
        de_tag: desafio.de_tag || "Frequência",
        de_pontos: desafio.de_pontos || 0,
        de_start: desafio.de_start ? desafio.de_start.split("T")[0] : "",
        de_end: desafio.de_end ? desafio.de_end.split("T")[0] : "",
        de_status: desafio.de_status || "Inativo",
      });
    }
  }, [desafio]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.de_id) {
      alert("ID do desafio ausente");
      return;
    }

    if (!form.de_nome.trim()) {
      return alert("Informe o nome do desafio");
    }

    if (!form.de_end) {
      return alert("Informe a data de término do desafio");
    }

    // Chama a função onSave que fará o PUT request no componente pai
    onSave(form);
  };

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Editar Desafio</h3>
          </div>

          <div className="modal-body">
            <form onSubmit={submit} className="form-card">
              <div className="form-group">
                <label>
                  Nome <span className="required">*</span>
                </label>
                <input
                  name="de_nome"
                  value={form.de_nome}
                  onChange={handleChange}
                  placeholder="Nome do desafio"
                  required
                />
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  name="de_descricao"
                  value={form.de_descricao}
                  onChange={handleChange}
                  placeholder="Descreva o objetivo do desafio..."
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tipo / Tag</label>
                  <select
                    name="de_tag"
                    value={form.de_tag}
                    onChange={handleChange}
                  >
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
                    name="de_pontos"
                    type="number"
                    value={form.de_pontos}
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
                    name="de_start"
                    type="date"
                    value={form.de_start}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Data de Término <span className="required">*</span>
                  </label>
                  <input
                    name="de_end"
                    type="date"
                    value={form.de_end}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="de_status"
                    value={form.de_status}
                    onChange={handleChange}
                  >
                    <option value="Inativo">Inativo</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-salvar" onClick={submit}>
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
