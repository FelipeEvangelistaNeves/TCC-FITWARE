import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/treinoActive.scss";
import { Play, Pause, Square, Check, Minimize2 } from "lucide-react";

export default function TreinoActiveModal({ treino, onClose, onMinimize }) {
  // Estado do Timer (contagem regressiva)
  const [tempoRestante, setTempoRestante] = useState(
    (treino.tr_tempo || treino.tempo || 30) * 60
  );
  const [ativo, setAtivo] = useState(true);

  // Estado dos exercícios
  // Mapeia os dados vindos do backend (Exercicios) ou mock (exercicios)
  const [exercicios, setExercicios] = useState(
    (treino.Exercicios || treino.exercicios || []).map((ex) => ({
      ...ex,
      concluido: false,
    }))
  );

  // Lógica do Timer
  useEffect(() => {
    let intervalo = null;
    if (ativo && tempoRestante > 0) {
      intervalo = setInterval(() => {
        setTempoRestante((tempo) => tempo - 1);
      }, 1000);
    } else if (tempoRestante === 0) {
      setAtivo(false);
    }
    return () => clearInterval(intervalo);
  }, [ativo, tempoRestante]);

  // Formatar tempo MM:SS
  const formatarTempo = (segundos) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Alternar conclusão do exercício
  const alternarExercicio = (index) => {
    setExercicios((prev) =>
      prev.map((ex, i) =>
        i === index ? { ...ex, concluido: !ex.concluido } : ex
      )
    );
  };

  // Calcular progresso
  const progresso = Math.round(
    (exercicios.filter((ex) => ex.concluido).length / exercicios.length) * 100
  );

  return (
    <div className="treino-active-overlay">
      <div className="treino-active-modal">
        {/* Cabeçalho */}
        <div className="modal-header">
          <h2>{treino.tr_nome || treino.titulo}</h2>
          <button className="minimize-btn" onClick={onMinimize}>
            <Minimize2 size={20} />
          </button>
        </div>

        {/* Seção do Timer */}
        <div className="timer-section">
          <span className="time-display">{formatarTempo(tempoRestante)}</span>

          <div className="timer-controls">
            <button className="toggle-btn" onClick={() => setAtivo(!ativo)}>
              {ativo ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button className="stop-btn" onClick={onClose}>
              <Square size={20} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Lista de Exercícios */}
        <div className="exercises-list">
          {exercicios.map((ex, index) => (
            <div
              key={index}
              className={`exercise-item ${ex.concluido ? "completed" : ""}`}
              onClick={() => alternarExercicio(index)}
            >
              <div className={`checkbox ${ex.concluido ? "checked" : ""}`}>
                {ex.concluido && <Check size={16} />}
              </div>
              <div className="exercise-info">
                <span className="exercise-name">{ex.ex_nome || ex.nome}</span>
                {(ex.ex_descricao || ex.descricao) && (
                  <span className="exercise-desc">
                    {ex.ex_descricao || ex.descricao}
                  </span>
                )}
                <span className="exercise-meta">
                  {ex.ex_repeticoes || ex.sets}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé */}
        <div className="modal-footer">
          <button className="finish-btn" onClick={onClose}>
            Finalizar Treino ({progresso || 0}%)
          </button>
        </div>
      </div>
    </div>
  );
}
