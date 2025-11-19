import React from "react";
import "../../styles/pages/admin/forms.scss";

export default function DetalhesDesafio({ desafio, onClose }) {
  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal-content">
        <h3>Detalhes do Desafio</h3>

        <div className="form-card">
          <p>
            <strong>Nome:</strong> {desafio.nome}
          </p>
          <p>
            <strong>Descrição:</strong> {desafio.descricao}
          </p>
          <p>
            <strong>Tipo:</strong> {desafio.tipo}
          </p>
          <p>
            <strong>Duração:</strong> {desafio.duracao}
          </p>
          <p>
            <strong>Pontos:</strong> {desafio.pontos}
          </p>
          <p>
            <strong>Status:</strong> {desafio.status}
          </p>
        </div>

        <div className="modal-actions">
          <button className="btn-cancelar" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
