import React from "react";
import "../../styles/pages/aluno/resgatePontos.scss";

export default function ResgatePontosModal({ onClose }) {
  
  return (
    <div className="resgate-modal">
      <div className="resgate-header">
        <button className="back-btn" onClick={onClose}>
          <i className="bi bi-arrow-left"></i>
        </button>
        <h2>Resgate de Pontos</h2>
      </div>
      <div className="resgate-opcoes">
        <h3>Opções de Resgate</h3>

        <div className="resgate-card purple">
          <div className="info">
            <h4>Sessão de Treino Personalizada</h4>
            <p>Uma sessão exclusiva com seu personal trainer para focar em seus objetivos específicos.</p>
            <span className="pontos-custo">500 pontos</span>
          </div>
          <button className="resgatar">Resgatar</button>
        </div>

        <div className="resgate-card blue">
          <div className="info">
            <h4>Consulta com Nutricionista</h4>
            <p>Uma consulta com nutricionista para criar um plano alimentar personalizado para seus objetivos.</p>
            <span className="pontos-custo">400 pontos</span>
          </div>
          <button className="resgatar">Resgatar</button>
        </div>

        <div className="resgate-card green">
          <div className="info">
            <h4>Desconto em Produtos</h4>
            <p>15% de desconto em produtos da loja parceira (suplementos, roupas e acessórios).</p>
            <span className="pontos-custo">300 pontos</span>
          </div>
          <button className="resgatar">Resgatar</button>
        </div>
      </div>
    </div>
  );
}
