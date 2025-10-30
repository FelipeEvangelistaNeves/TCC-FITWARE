import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/admin/forms.scss";

export default function AddAluno() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    turma: "",
    status: "Ativo",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Aluno "${form.nome}" adicionado com sucesso!`);
    navigate("/admin/alunos");
  };

  return (
    <div className="form-page">
      <h2>Adicionar Novo Aluno</h2>

      <form onSubmit={handleSubmit} className="form-card">
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
            placeholder="Ex: Cardio"
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

        <div className="form-actions">
          <button
            type="button"
            className="btn-outline"
            onClick={() => navigate("/admin/alunos")}
          >
            Cancelar
          </button>
          <button type="submit" className="btn-purple">
            Adicionar Aluno
          </button>
        </div>
      </form>
    </div>
  );
}
