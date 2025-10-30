import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/pages/admin/forms.scss";

export default function EditarBrinde() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "Camiseta FitWare",
    pontos: 500,
    estoque: 45,
    status: "ativo",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Brinde ${id} atualizado com sucesso!`);
    navigate("/admin/brindes");
  };

  return (
    <div className="form-page">
      <h2>Editar Brinde</h2>

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-group">
          <label>Nome do Brinde</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
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
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="ativo">Ativo</option>
            <option value="esgotado">Esgotado</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-outline"
            onClick={() => navigate("/admin/brindes")}
          >
            Voltar
          </button>
          <button type="submit" className="btn-purple">
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
