// src/pages/admin/modals/DetalhesDesafio.jsx
import React from "react";
import "../../styles/pages/admin/forms.scss";

export default function DetalhesDesafio({ desafio, onClose }) {
  if (!desafio) return null;

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3>{desafio.nome}</h3>

          <p style={{ color: "var(--color-text-muted)" }}>
            {desafio.descricao}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginTop: 12,
            }}
          >
            <div>
              <strong>Tipo</strong>
              <div>{desafio.tipo}</div>
            </div>
            <div>
              <strong>Duração</strong>
              <div>{desafio.duracao}</div>
            </div>
            <div>
              <strong>Participantes</strong>
              <div>{desafio.participantes}</div>
            </div>
            <div>
              <strong>Pontos</strong>
              <div>⭐ {desafio.pontos}</div>
            </div>
            <div>
              <strong>Status</strong>
              <div>{desafio.status}</div>
            </div>
            <div>
              <strong>Ícone</strong>
              <div>{desafio.icone}</div>
            </div>
          </div>

          <div className="modal-actions" style={{ marginTop: 20 }}>
            <button className="btn-cancelar" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
