import React from "react";
import "../../styles/pages/professor/detalhesTreino.scss";

export default function DetalhesTreino({ treino, onClose }) {
  if (!treino) return null;

  return (
    <div className="detalhes-treino-modal">
      <div className="detalhes-content">
        <button className="fechar" onClick={onClose}>
          ×
        </button>
        <h2>{treino.tr_nome}</h2>
        <p>{treino.tr_descricao}</p>

        <h3>Exercícios:</h3>
        <ul>
          {treino.Exercicios?.map((ex) => (
            <li key={ex.ex_id}>
              <strong>{ex.ex_nome}</strong> — {ex.ex_repeticoes}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
