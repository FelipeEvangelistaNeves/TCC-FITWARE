import React from "react";
import "../../styles/pages/admin/forms.scss";

export default function DetalhesProfessor({ professor, onClose }) {
  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3>Detalhes do Professor</h3>

          <div className="form-card">
            <div className="form-group">
              <label>ID:</label>
              <span>{professor.id}</span>
            </div>

            <div className="form-group">
              <label>Nome:</label>
              <span>{professor.nome}</span>
            </div>

            <div className="form-group">
              <label>Especialidade:</label>
              <span>{professor.especialidade}</span>
            </div>

            <div className="form-group">
              <label>Status:</label>
              <span
                className={`status-badge ${professor.status.toLowerCase()}`}>
                {professor.status}
              </span>
            </div>
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
