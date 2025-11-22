import React from "react";
import "../../styles/pages/aluno/treinosDetalhes.scss";

export default function TreinoDetalhesModal({ treino, onClose }) {
  if (!treino) return null;

  return (
    <div className="modal-overlay">
      <div className="detalhes-treino-modal">
        {/* HEADER */}
        <div className="header">
          <button className="close-btn" onClick={onClose}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <h2>{treino.nome}</h2>
          <i className="bi bi-pencil-square edit-icon"></i>
        </div>

        {/* TAGS */}
        <div className="tags">
          <span className="tag">{treino.dificuldade}</span>
          <span className="tag">{treino.tipo}</span>
          <span className="tag">{treino.tempo} min</span>
        </div>

        {/* DESCRIÇÃO */}
        <p className="descricao">{treino.descricao}</p>

        {/* CARDS */}
        <div className="info-cards">
          <div className="card-info">
            <h3>Exercícios</h3>
            <p>{treino.exercicios.length}</p>
          </div>
          <div className="card-info">
            <h3>Minutos</h3>
            <p>{treino.tempo}</p>
          </div>
          <div className="card-info">
            <h3>Calorias</h3>
            <p>{treino.calorias ?? 0}</p>
          </div>
        </div>

        {/* LISTA DE EXERCÍCIOS */}
        <h3 className="exercicios">Exercícios</h3>

        {treino.exercicios.map((ex, index) => (
          <div className="card-exercicio" key={ex.id}>
            <div className="title">
              <span className="numero">{index + 1}</span> {ex.nome}
              <i className="bi bi-chevron-down"></i>
            </div>

            <div className="conteudo">
              <p>
                <strong>Séries e Repetições:</strong> {ex.series} séries |{" "}
                {ex.repeticoes} repetições | {ex.descanso}s descanso
              </p>

              <p>
                <strong>Instruções:</strong> {ex.instrucoes}
              </p>

              {ex.video && (
                <div className="video">
                  <i className="bi bi-play-circle"></i>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* BOTÃO INICIAR */}
        <button className="btn-iniciar">Iniciar Treino</button>
      </div>
    </div>
  );
}
