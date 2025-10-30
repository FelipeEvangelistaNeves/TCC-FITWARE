import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/pages/admin/forms.scss";

export default function EditarAluno() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "Maria Silva",
    turma: "Funcional",
    status: "Ativo",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Aluno ${id} atualizado com sucesso!`);
    navigate("/admin/alunos");
  };

  return (
    <div className="form-page">
      <h2>Editar Aluno</h2>

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-group">
          <label>Nome do Aluno</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
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
