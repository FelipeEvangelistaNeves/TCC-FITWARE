import React, { useState } from "react";
import "../../styles/pages/admin/forms.scss";

export default function EditarAluno({ aluno, onClose, onSave }) {
  const [form, setForm] = useState({
    al_id: aluno.al_id,
    nome: aluno.al_nome,
    email: aluno.al_email,
    cpf: aluno.al_cpf,
    telefone: aluno.al_telefone,
    dtnasc: aluno.al_dtnasc,
    pontos: aluno.al_pontos,
    treinos_completos: aluno.al_treinos_completos,
    status: aluno.al_status,
    turma: aluno.turma,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      al_id: form.al_id,
      al_nome: form.nome,
      al_email: form.email,
      al_cpf: form.cpf,
      al_telefone: form.telefone,
      al_dtnasc: form.dtnasc,
      al_pontos: Number(form.pontos),
      al_treinos_completos: Number(form.treinos_completos),
      al_status: form.status,
      turma: form.turma,
    });
  };

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Editar Aluno</h3>

          <form onSubmit={handleSubmit}>
            {/* NOME */}
            <div className="form-group">
              <label>Nome do Aluno *</label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* CPF */}
            <div className="form-group">
              <label>CPF *</label>
              <input
                type="text"
                name="cpf"
                maxLength={11}
                value={form.cpf}
                onChange={handleChange}
                required
              />
            </div>

            {/* TELEFONE */}
            <div className="form-group">
              <label>Telefone</label>
              <input
                type="text"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                maxLength={11}
              />
            </div>

            {/* DATA DE NASCIMENTO */}
            <div className="form-group">
              <label>Data de Nascimento *</label>
              <input
                type="date"
                name="dtnasc"
                value={form.dtnasc}
                onChange={handleChange}
                required
              />
            </div>

            {/* PONTOS */}
            <div className="form-group">
              <label>Pontos</label>
              <input
                type="number"
                name="pontos"
                value={form.pontos}
                onChange={handleChange}
              />
            </div>

            {/* TREINOS COMPLETOS */}
            <div className="form-group">
              <label>Treinos Completos</label>
              <input
                type="number"
                name="treinos_completos"
                value={form.treinos_completos}
                onChange={handleChange}
              />
            </div>

            {/* STATUS */}
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Ativo</option>
                <option>Inativo</option>
              </select>
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
