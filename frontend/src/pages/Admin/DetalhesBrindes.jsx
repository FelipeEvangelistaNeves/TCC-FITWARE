import React from "react";
import "../../styles/pages/admin/forms.scss";

export default function DetalhesBrinde({ brinde, onClose }) {
  return (
    <div className="admin-brindes-page">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Detalhes do Brinde</h3>
          <p>
            <strong>Nome:</strong> {brinde.nome}
          </p>
          <p>
            <strong>Pontos:</strong> {brinde.pontos}
          </p>
          <p>
            <strong>Estoque:</strong> {brinde.estoque}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {brinde.status === "ativo" ? "Ativo" : "Esgotado"}
          </p>
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
