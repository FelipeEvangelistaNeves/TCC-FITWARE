import React from "react";
import "../../styles/pages/admin/excluir.scss";

export default function ExcluirAluno({ aluno, onClose, onConfirm }) {
  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3>Excluir Aluno</h3>
          <p>
            Tem certeza que deseja excluir o aluno <strong>{aluno.nome}</strong>
            ?<br />
            Essa ação não poderá ser desfeita.
          </p>

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
