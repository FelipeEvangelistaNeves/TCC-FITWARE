import React from "react";
import "../../styles/pages/admin/excluir.scss"; // mesmo estilo do excluir aluno

export default function ExcluirProfessor({ professor, onClose, onConfirm }) {
  return (
    <div className="admin-excluir">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card excluir-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Excluir Professor</h3>
          <p>
            Tem certeza que deseja excluir o professor{" "}
            <strong>{professor.nome}</strong>?<br />
          </p>
          <div className="alerta">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span>Esta ação não poderá ser desfeita.</span>
          </div>

          <div className="modal-actions">
            <button className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button
              className="btn-excluir"
              onClick={() => onConfirm(professor)}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
