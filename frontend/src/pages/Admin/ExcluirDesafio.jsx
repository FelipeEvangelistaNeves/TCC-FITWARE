import React from "react";
import "../../styles/pages/admin/forms.scss";

export default function DeleteDesafio({ desafio, onClose, onConfirm }) {
  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal-content">
        <h3>Excluir Desafio</h3>

        <div className="form-card">
          <p>Deseja realmente excluir o desafio abaixo?</p>
          <p>
            <strong>{desafio.nome}</strong>
          </p>
        </div>

        <div className="modal-actions">
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>

          <button
            className="btn-salvar"
            style={{ background: "var(--color-red)" }}
            onClick={onConfirm}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
