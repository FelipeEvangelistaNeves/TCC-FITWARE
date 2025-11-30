import React from "react";
import "../../styles/pages/admin/excluir.scss";

export default function ExcluirResgate({ resgate, onClose, onConfirm }) {
  if (!resgate) return null;

  return (
    <div className="admin-excluir">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3>Excluir Resgate</h3>
          <p>
            Tem certeza que deseja excluir o resgate{" "}
            <strong>#{resgate.re_id}</strong>?
          </p>

          <div className="alerta">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span>Esta ação não poderá ser desfeita.</span>
          </div>

          <div className="modal-actions">
            <button className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn-excluir" onClick={onConfirm}>
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
