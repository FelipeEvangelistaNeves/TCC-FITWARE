import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/admin/forms.scss";

export default function AddProfessor() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    especialidade: "",
    status: "Ativo",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Professor ${form.nome} adicionado com sucesso!`);
    navigate("/admin/professores");
  };

  return (
    <div className="form-page">
      <div className="form-header">
        <h2>Adicionar Professor</h2>
        <p>Cadastre um novo professor no sistema FitWare.</p>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome Completo</label>
          <input
            type="text"
            required
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            placeholder="Digite o nome do professor"
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
            placeholder="Ex: Musculação, Yoga, Funcional..."
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
            Cancelar
          </button>
          <button type="submit" className="btn-purple">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
