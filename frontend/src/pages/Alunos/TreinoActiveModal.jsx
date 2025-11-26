import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/treinoActive.scss";
import { Play, Pause, Square, Check, Minimize2 } from "lucide-react";

export default function TreinoActiveModal({
  treino,
  onClose,
  onMinimize,
  onTreinoCompleted,
}) {
  // Estado do Timer (contagem regressiva)
  const [tempoRestante, setTempoRestante] = useState(
    (treino.tr_tempo || treino.tempo || 60) * 60
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

  // Descrição do treino
  const descricaoTreino = treino.tr_descricao || treino.descricao || "";

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

  // Registrar treino concluído
  const finalizarTreino = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/aluno/treino/concluido`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tr_id: treino.id || treino.tr_id,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("❌ Erro na resposta:", errorData);
        throw new Error(
          errorData.error || "Erro ao registrar treino concluído"
        );
      }

      const data = await res.json();

      // Chama callback se existir, senão apenas fecha
      if (typeof onTreinoCompleted === "function") {
        onTreinoCompleted();
      } else {
        console.log(
          "⚠️ onTreinoCompleted não fornecido, fechando apenas o modal"
        );
        onClose();
      }
    } catch (error) {
      alert("Erro ao registrar treino. Tente novamente.");
    }
  };

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

        {/* Descrição do Treino */}
        {descricaoTreino && (
          <div className="descricao-treino">
            <p>{descricaoTreino}</p>
          </div>
        )}

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
                <span className="exercise-number">{index + 1}</span>
                <span className="exercise-name">{ex.ex_nome || ex.nome}</span>

                {/* Séries e Repetições */}
                <div className="exercise-series">
                  <span className="value">{ex.series}</span>
                  <span>x</span>
                  <span className="value">{ex.repeticoes}</span>
                </div>

                {/* Instrução */}
                {(ex.ex_intrucao || ex.instrucao) && (
                  <div className="exercise-instrucao">
                    <span className="label">Instrução:</span>
                    <span className="value">
                      {ex.ex_intrucao || ex.instrucao}
                    </span>
                  </div>
                )}

                {/* Descanso */}
                {(ex.ex_descanso || ex.descanso) && (
                  <div className="exercise-descanso">
                    <span className="label">Descanso: </span>
                    <span className="value">
                      {ex.ex_descanso || ex.descanso}s
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé */}
        <div className="modal-footer">
          <button className="finish-btn" onClick={finalizarTreino}>
            Finalizar Treino ({progresso || 0}%)
          </button>
        </div>
      </div>
    </div>
  );
}
