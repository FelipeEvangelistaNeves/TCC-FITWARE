import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/pages/admin/forms.scss";

export default function EditarProfessor() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock de dados (simula carregamento de professor)
  const [form, setForm] = useState({
    nome: "Maria Souza",
    especialidade: "Treinos Funcionais",
    status: "Ativo",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Professor ${form.nome} atualizado com sucesso!`);
    navigate("/admin/professores");
  };

  return (
    <div className="form-page">
      <div className="form-header">
        <h2>Editar Professor</h2>
        <p>Modifique as informações do professor #{id}</p>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome Completo</label>
          <input
            type="text"
            required
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Especialidade</label>
          <input
            type="text"
            required
            value={form.especialidade}
            onChange={(e) =>
              setForm({ ...form, especialidade: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Ativo</option>
            <option>Inativo</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-outline"
            onClick={() => navigate("/admin/professores")}
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
