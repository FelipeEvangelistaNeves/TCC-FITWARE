import React from "react";
import "../../styles/pages/admin/forms.scss";

export default function DetalhesTreino({ treino, onClose }) {
  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card detalhes-treino"
          onClick={(e) => e.stopPropagation()}>
          <h3>{treino.nome}</h3>
          <p>
            <strong>Tipo:</strong> {treino.tipo}
          </p>
          <p>
            <strong>Nível:</strong> {treino.nivel}
          </p>
          <p>
            <strong>Duração:</strong> {treino.duracao} min
          </p>
          <p>
            <strong>Status:</strong> {treino.status}
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
