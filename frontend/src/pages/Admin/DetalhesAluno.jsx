import React from "react";
import "../../styles/pages/admin/forms.scss";

export default function DetalhesAluno({ aluno, onClose }) {
  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card"
          onClick={(e) => e.stopPropagation()}>
          <h3>Detalhes do Aluno</h3>

          <div className="form-group">
            <label>ID</label>
            <input type="text" value={aluno.id} readOnly />
          </div>

          <div className="form-group">
            <label>Nome</label>
            <input type="text" value={aluno.nome} readOnly />
          </div>

          <div className="form-group">
            <label>Turma</label>
            <input type="text" value={aluno.turma} readOnly />
          </div>

          <div className="form-group">
            <label>Status</label>
            <input type="text" value={aluno.status} readOnly />
          </div>

          {aluno.observacoes && (
            <div className="form-group">
              <label>Observações</label>
              <textarea value={aluno.observacoes} readOnly />
            </div>
          )}

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
