import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/admin/forms.scss";

export default function AddBrinde() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    pontos: "",
    estoque: "",
    status: "ativo",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Brinde "${form.nome}" criado com sucesso!`);
    navigate("/admin/brindes");
  };

  return (
    <div className="form-page">
      <h2>Criar Novo Brinde</h2>

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-group">
          <label>Nome do Brinde</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Ex: Camiseta FitWare"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Pontos Necessários</label>
            <input
              type="number"
              name="pontos"
              value={form.pontos}
              onChange={handleChange}
              placeholder="Ex: 500"
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
              placeholder="Ex: 20"
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
            Cancelar
          </button>
          <button type="submit" className="btn-purple">
            Criar Brinde
          </button>
        </div>
      </form>
    </div>
  );
}
