import React from "react";
import "../../styles/pages/aluno/treinosDetalhes.scss";

export default function TreinoDetalhesModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="detalhes-treino-modal">
        {/* Header */}
        <div className="header">
          <button className="close-btn" onClick={onClose}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <h2>Detalhes do treino</h2>
          <i className="bi bi-pencil-square edit-icon"></i>
        </div>

        {/* Informações principais */}
        <div className="tags">
          <span className="tag">Intermediário</span>
          <span className="tag">Força</span>
          <span className="tag">45 min</span>
        </div>

        <p className="descricao">
          Treino de força focado em membros superiores e inferiores, ideal para
          ganho de massa muscular e resistência. Recomendado para alunos de nível
          intermediário.
        </p>

        <div className="info-cards">
            <div className="card-info">
                <h3>Exercícios</h3>
                <p>6</p>
            </div>
            <div className="card-info">
                <h3>Minutos</h3>
                <p>45</p>
            </div>
            <div className="card-info">
                <h3>Calorias</h3>
                <p>450</p>
            </div>
        </div>


        {/* Exercícios */}
        <div className="exercicios">
          <h3>Exercícios</h3>
        </div>

        <div className="card-exercicio">
          <div className="title">
            <span className="numero">1</span> Agachamento
            <i className="bi bi-chevron-down"></i>
          </div>
          <div className="conteudo">
            <p>
              <strong>Séries e Repetições:</strong> 3 séries | 12 repetições | 60s
              descanso
            </p>
            <p>
              <strong>Instruções:</strong> Manter joelhos alinhados com os pés e
              desça até que as coxas fiquem paralelas ao chão. Mantenha as costas
              retas durante todo o movimento.
            </p>
            <div className="video">
              <i className="bi bi-play-circle"></i>
            </div>
          </div>
        </div>

        {/* Mais exercícios */}
        <div className="card-exercicio small">
          2 Supino <i className="bi bi-chevron-right"></i>
        </div>
        <div className="card-exercicio small">
          3 Remada <i className="bi bi-chevron-right"></i>
        </div>
        <div className="card-exercicio small">
          4 Leg Press <i className="bi bi-chevron-right"></i>
        </div>

        {/* Botão iniciar treino */}
        <button className="btn-iniciar">Iniciar Treino</button>
      </div>
    </div>
  );
}
