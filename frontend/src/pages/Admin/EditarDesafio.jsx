// src/pages/admin/modals/EditDesafio.jsx
import React, { useState, useEffect } from "react";
import "../../styles/pages/admin/forms.scss";

export default function EditDesafio({ desafio, onClose, onSave }) {
  // normalize incoming desafio fields to our form shape
  const initial = {
    de_id: desafio?.de_id ?? desafio?.id ?? null,
    de_nome: desafio?.de_nome ?? desafio?.nome ?? "",
    de_descricao: desafio?.de_descricao ?? desafio?.descricao ?? "",
    de_tag: desafio?.de_tag ?? desafio?.tipo ?? "",
    de_pontos: desafio?.de_pontos ?? desafio?.pontos ?? 0,
    de_progresso: desafio?.de_progresso ?? desafio?.progresso ?? 0,
    de_start: desafio?.de_start ?? null,
    de_end: desafio?.de_end ?? desafio?.duracao ?? null,
    de_status: desafio?.de_status ?? "Inativo",
  };

  const [form, setForm] = useState(initial);

  useEffect(() => setForm({ ...initial }), [desafio]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.de_id) {
      // cannot update without id
      alert("ID do desafio ausente");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/desafios/${form.de_id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Falha ao atualizar desafio");
        return;
      }

      const data = await res.json();
      if (typeof onSave === "function") onSave(data.desafio || form);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar desafio:", error);
      alert("Erro ao atualizar desafio");
    }
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
              <input
                name="de_nome"
                value={form.de_nome}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                name="de_descricao"
                value={form.de_descricao}
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label>Tipo / Tag</label>
                <select
                  name="de_tag"
                  value={form.de_tag}
                  onChange={handleChange}
                >
                  <option value="Frequência">Frequência</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Nutrição">Nutrição</option>
                </select>
              </div>
              <div style={{ width: 140 }}>
                <label>Pontos</label>
                <input
                  name="de_pontos"
                  type="number"
                  value={form.de_pontos}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div
              className="form-group"
              style={{ display: "flex", gap: 12, marginTop: 12 }}
            >
              <div style={{ flex: 1 }}>
                <label>Progresso (%)</label>
                <input
                  name="de_progresso"
                  type="number"
                  min="0"
                  max="100"
                  value={form.de_progresso}
                  onChange={handleChange}
                />
              </div>
              <div style={{ width: 200 }}>
                <label>Data fim</label>
                <input
                  name="de_end"
                  type="date"
                  value={form.de_end ? form.de_end.split("T")[0] : ""}
                  onChange={handleChange}
                />
              </div>
              <div style={{ width: 160 }}>
                <label>Status</label>
                <select
                  name="de_status"
                  value={form.de_status}
                  onChange={handleChange}
                >
                  <option>Inativo</option>
                  <option>Ativo</option>
                  <option>Concluído</option>
                </select>
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
