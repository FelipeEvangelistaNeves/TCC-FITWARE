import React from "react";
import "../../styles/pages/aluno/treinos.scss";

export default function TreinoDetalhesModal({ treino, onClose }) {
  if (!treino) return null;

  // Scroll na lista de exercícios
  return (
    <div className="modal-overlay">
      <div className="detalhes-treino-modal">
        {/* HEADER */}
        <div className="header">
          <button className="close-btn" onClick={onClose}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <h2>{treino.tr_nome}</h2>
          <i className="bi bi-pencil-square edit-icon"></i>
        </div>

        {/* TAGS */}
        <div className="tags">
          <span className="tag">{treino.tr_dificuldade}</span>
          <span className="tag">{treino.tr_categoria}</span>
          <span className="tag">{treino.tr_tempo} min</span>
        </div>

        {/* DESCRIÇÃO */}
        <p className="descricao">{treino.tr_descricao}</p>

        {/* CARDS */}
        <div className="info-cards">
          <div className="card-info">
            <h3>Exercícios</h3>
            <p>{treino.Exercicios ? treino.Exercicios.length : 0}</p>
          </div>
          <div className="card-info">
            <h3>Minutos</h3>
            <p>{treino.tr_tempo}</p>
          </div>
          <div className="card-info">
            <h3>Calorias</h3>
            <p>{treino.calorias ?? 0}</p>
          </div>
        </div>

        {/* LISTA DE EXERCÍCIOS COM SCROLL */}
        <div
          className="exercicios"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          <h3>Exercícios</h3>
          {treino.Exercicios?.map((ex, index) => (
            <div className="card-exercicio" key={ex.ex_nome || index}>
              <div className="title">
                <span className="numero">{index + 1}</span> {ex.ex_nome}
                <i className="bi bi-chevron-down"></i>
              </div>

              <div className="conteudo">
                <p>
                  <strong>Séries e Repetições:</strong> {ex.ex_series} séries |{" "}
                  {ex.ex_repeticoes} repetições | {ex.ex_descanso}s descanso
                </p>

                {ex.ex_intrucao && (
                  <p>
                    <strong>Instruções:</strong> {ex.ex_intrucao}
                  </p>
                )}

                {ex.video && (
                  <div className="video">
                    <i className="bi bi-play-circle"></i>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* BOTÃO INICIAR */}
        <button className="btn-iniciar">Iniciar Treino</button>
      </div>
    </div>
  );
}
