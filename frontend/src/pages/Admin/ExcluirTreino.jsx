import React from "react";
import "../../styles/pages/admin/forms.scss";

export default function ExcluirTreino({ treino, onClose, onDelete }) {
  return (
    <div className="admin-excluir">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card excluir-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Excluir Treino</h3>

          <p>
            Tem certeza que deseja excluir o treino{" "}
            <strong>{treino.nome}</strong>?
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
              onClick={() => {
                onDelete(treino);
                onClose();
              }}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
