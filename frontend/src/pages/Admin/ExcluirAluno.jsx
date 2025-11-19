import React from "react";
import "../../styles/pages/admin/excluir.scss";

export default function ExcluirAluno({ aluno, onClose, onConfirm }) {
  return (
    <div className="admin-excluir">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card excluir-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Excluir Aluno</h3>
          <p>
            Tem certeza que deseja excluir o aluno{" "}
            <strong>{aluno.al_nome}</strong>
            ?<br />
          </p>
          <div className="alerta">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span>Esta ação não poderá ser desfeita.</span>
          </div>
          <div className="modal-actions">
            <button className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn-excluir" onClick={() => onConfirm(aluno)}>
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
