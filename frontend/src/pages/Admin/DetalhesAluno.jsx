import React from "react";
import "../../styles/pages/admin/forms.scss";

export default function DetalhesAluno({ aluno, onClose }) {
  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Detalhes do Aluno</h3>

          <div className="form-group">
            <label>ID</label>
            <input type="text" value={aluno.al_id} readOnly />
          </div>

          <div className="form-group">
            <label>Nome</label>
            <input type="text" value={aluno.al_nome} readOnly />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="text" value={aluno.al_email} readOnly />
          </div>

          <div className="form-group">
            <label>CPF</label>
            <input type="text" value={aluno.al_cpf} readOnly />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input type="text" value={aluno.al_telefone} readOnly />
          </div>

          <div className="form-group">
            <label>Data de Nascimento</label>
            <input type="text" value={aluno.al_dtnasc} readOnly />
          </div>

          <div className="form-group">
            <label>Status</label>
            <input type="text" value={aluno.al_status} readOnly />
          </div>

          <div className="form-group">
            <label>Pontos</label>
            <input type="text" value={aluno.al_pontos} readOnly />
          </div>

          <div className="form-group">
            <label>Treinos Completos</label>
            <input type="text" value={aluno.al_treinos_completos} readOnly />
          </div>

          <div className="modal-actions">
            <button className="btn-cancelar" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
