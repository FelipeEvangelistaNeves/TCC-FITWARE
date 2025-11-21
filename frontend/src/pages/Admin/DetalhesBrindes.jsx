import React from "react";
import "../../styles/pages/admin/forms.scss";

export default function DetalhesBrinde({ brinde, onClose }) {
  if (!brinde) return null;
  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Detalhes do Brinde</h3>

          <div className="form-group">
            <label>ID</label>
            <input
              type="text"
              value={brinde.id || brinde.br_id || ""}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Nome</label>
            <input type="text" value={brinde.nome || ""} readOnly />
          </div>

          <div className="form-group">
            <label>Pontos</label>
            <input type="text" value={brinde.pontos ?? ""} readOnly />
          </div>

          <div className="form-group">
            <label>Estoque</label>
            <input type="text" value={brinde.estoque ?? ""} readOnly />
          </div>

          <div className="form-group">
            <label>Status</label>
            <input type="text" value={brinde.status || ""} readOnly />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <input type="text" value={brinde.descricao || ""} readOnly />
          </div>

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
