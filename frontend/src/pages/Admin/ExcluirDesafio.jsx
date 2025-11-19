// src/pages/admin/modals/ExcluirDesafio.jsx
import React from "react";
import "../../styles/pages/admin/forms.scss";

export default function ExcluirDesafio({ desafio, onClose, onConfirm }) {
  if (!desafio) return null;

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3>Excluir Desafio</h3>
          <p>
            Tem certeza que deseja excluir <strong>{desafio.nome}</strong>?
          </p>

          <div className="modal-actions">
            <button className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn-salvar" onClick={onConfirm}>
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
