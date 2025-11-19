import React, { useState } from "react";
import "../../styles/pages/admin/forms.scss";

export default function EditDesafio({ desafio, onClose, onSave }) {
  const [dados, setDados] = useState(desafio);

  const alterar = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal-content">
        <h3>Editar Desafio</h3>

        <div className="form-card">
          <div className="form-group">
            <label>Nome</label>
            <input name="nome" value={dados.nome} onChange={alterar} />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="descricao"
              value={dados.descricao}
              onChange={alterar}
            />
          </div>

          <div className="form-group">
            <label>Tipo</label>
            <input name="tipo" value={dados.tipo} onChange={alterar} />
          </div>

          <div className="form-group">
            <label>Duração</label>
            <input name="duracao" value={dados.duracao} onChange={alterar} />
          </div>

          <div className="form-group">
            <label>Pontos</label>
            <input
              type="number"
              name="pontos"
              value={dados.pontos}
              onChange={alterar}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>

          <button className="btn-salvar" onClick={() => onSave(dados)}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
