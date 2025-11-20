import React from "react";
import "../../styles/pages/admin/forms.scss";

export default function DetalhesProfessor({ professor, onClose }) {
  if (!professor) return null;
  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Detalhes do Professor</h3>

          <div className="form-group">
            <label>ID</label>
            <input type="text" value={professor.fu_id} readOnly />
          </div>

          <div className="form-group">
            <label>Nome</label>
            <input type="text" value={professor.fu_nome} readOnly />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="text" value={professor.fu_email} readOnly />
          </div>

          <div className="form-group">
            <label>CPF</label>
            <input type="text" value={professor.fu_cpf} readOnly />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input type="text" value={professor.fu_telefone || ""} readOnly />
          </div>

          <div className="form-group">
            <label>Data de Nascimento</label>
            <input type="text" value={professor.fu_dtnasc || ""} readOnly />
          </div>

          <div className="form-group">
            <label>CREF</label>
            <input type="text" value={professor.fu_cref || ""} readOnly />
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
