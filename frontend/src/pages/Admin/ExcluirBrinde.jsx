import React from "react";
import "../../styles/pages/admin/excluir.scss";

export default function ExcluirBrinde({ brinde, onClose, onConfirm }) {
  if (!brinde) return null;

  return (
    <div className="admin-excluir">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content">
          <h3>Excluir Brinde</h3>

          <p>
            Tem certeza que deseja excluir <strong>{brinde.nome}</strong>?
          </p>
          <p style={{ color: "#a3a3a3", marginTop: 6 }}>
            Essa ação não pode ser desfeita.
          </p>

          <div className="modal-actions">
            <button className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>

            <button
              className="btn-excluir"
              onClick={() => onConfirm(brinde.id)}
            >
              Excluir definitivamente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
