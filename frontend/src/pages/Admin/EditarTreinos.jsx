import React, { useEffect, useState } from "react";
import "../../styles/pages/admin/treinosmodal.scss";
import { X, Plus, Trash } from "lucide-react";

export default function EditarTreino({ treino, onClose, onSaved }) {
  if (!treino) return null;

  // IDs para localizar o treino
  const treinoId = treino.tr_id || treino.id;

  const [name, setName] = useState(treino?.tr_nome || treino?.nome || "");
  const [description, setDescription] = useState(
    treino?.tr_descricao || treino?.descricao || ""
  );
  const [difficulty, setDifficulty] = useState(
    treino?.tr_dificuldade || treino?.dificuldade || "Moderado"
  );

  const [exercises, setExercises] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [loadingExercises, setLoadingExercises] = useState(false);

  const [alunos, setAlunos] = useState([]);
  const [selectedAlunos, setSelectedAlunos] = useState([]);
  const [loadingAlunos, setLoadingAlunos] = useState(false);

  const [loading, setLoading] = useState(true);

  // Carregar alunos disponíveis e exercícios ao montar
  useEffect(() => {
    const fetchData = async () => {
      setLoadingAlunos(true);
      setLoadingExercises(true);

      try {
        const resAlunos = await fetch(
          `${import.meta.env.VITE_BASE_URL}/admin/allAlunos`,
          { credentials: "include" }
        );
        if (resAlunos.ok) {
          const data = await resAlunos.json();
          setAlunos(data.alunos || []);
        }
      } catch (error) {
        console.error("Erro ao carregar alunos:", error);
      } finally {
        setLoadingAlunos(false);
      }

      try {
        const resEx = await fetch(
          `${import.meta.env.VITE_BASE_URL}/professor/exercicios`,
          { credentials: "include" }
        );
        if (resEx.ok) {
          const data = await resEx.json();
          setAllExercises(data.exercicios || []);
        }
      } catch (error) {
        console.error("Erro ao carregar exercícios:", error);
      } finally {
        setLoadingExercises(false);
      }
    };

    fetchData();
  }, []);

  // Carregar detalhes do treino ao montar
  useEffect(() => {
    const fetchTreinoDetalhes = async () => {
      if (!treinoId) return;

      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/treinos/detalhes/${treinoId}`,
          { credentials: "include" }
        );

        if (res.ok) {
          const data = await res.json();

          // Pré-preencher campos
          if (data.tr_nome) setName(data.tr_nome);
          if (data.tr_descricao) setDescription(data.tr_descricao);
          if (data.tr_dificuldade) setDifficulty(data.tr_dificuldade);

          // Carregar exercícios
          if (data.exercicios && Array.isArray(data.exercicios)) {
            const mapped = data.exercicios.map((ex) => ({
              id: ex.ex_id || Math.random().toString(36).slice(2, 9),
              ex_id: ex.ex_id,
              nome: ex.ex_nome || ex.nome || "",
              series: ex.TreinoExercicio?.te_series || ex.series || "",
              repeticoes:
                ex.TreinoExercicio?.te_repeticoes || ex.repeticoes || "",
              descanso: ex.TreinoExercicio?.te_descanso || ex.descanso || "60",
              intrucao: ex.ex_instrucao || ex.instrucao || "",
            }));
            setExercises(mapped);
          }

          // Carregar alunos associados
          if (data.Alunos && Array.isArray(data.Alunos)) {
            setSelectedAlunos(data.Alunos.map((a) => a.al_id));
          }
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes do treino:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreinoDetalhes();
  }, [treinoId]);

  const toggleAluno = (id) => {
    setSelectedAlunos((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addExercise = () => {
    setExercises((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2, 9),
        ex_id: null,
        nome: "",
        series: "",
        repeticoes: "",
        descanso: "60",
        intrucao: "",
      },
    ]);
  };

  const removeExercise = (id) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const updateExercise = (id, key, value) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, [key]: value } : ex))
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const exerciciosPayload = exercises
      .map((ex) => ({
        ex_id: ex.ex_id || undefined,
        nome: ex.nome,
        series: ex.series,
        repeticoes: ex.repeticoes,
        descanso: ex.descanso,
        intrucao: ex.intrucao,
      }))
      .filter((ex) => ex.ex_id || ex.nome);

    const payload = {
      tr_nome: name,
      tr_descricao: description,
      tr_dificuldade: difficulty,
      alunos: selectedAlunos,
      exercicios: exerciciosPayload,
    };

    try {
      if (!treinoId) throw new Error("ID do treino ausente");

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/treinos/${treinoId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Erro ao atualizar treino:", err);
        alert(err.error || "Falha ao atualizar treino");
        return;
      }

      if (typeof onSaved === "function") onSaved();
      if (typeof onClose === "function") onClose();
    } catch (error) {
      console.error("Erro ao salvar treino:", error);
      alert("Erro ao salvar treino");
    }
  };

  return (
    <div className="treino-overlay" onClick={onClose}>
      <div className="treino-modal" onClick={(e) => e.stopPropagation()}>
        <div className="treino-modal-header">
          <h2>Editar Treino</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="treino-modal-body" onSubmit={handleSave}>
          <div className="treino-section">
            <h3>Informações Básicas</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Nome do Treino *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Treino de Força"
                  required
                />
              </div>
              <div className="form-field">
                <label>Dificuldade</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option>Leve</option>
                  <option>Moderado</option>
                  <option>Difícil</option>
                  <option>Intenso</option>
                </select>
              </div>
            </div>
            <div className="form-grid full">
              <div className="form-field">
                <label>Descrição</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descrição do treino..."
                />
              </div>
            </div>
          </div>

          <div className="treino-section">
            <h3>Alunos</h3>
            {loadingAlunos ? (
              <p>Carregando alunos...</p>
            ) : alunos.length > 0 ? (
              <>
                <div className="alunos-selection">
                  {alunos.map((aluno) => (
                    <div key={aluno.al_id} className="aluno-option">
                      <input
                        type="checkbox"
                        id={`aluno-${aluno.al_id}`}
                        checked={selectedAlunos.includes(aluno.al_id)}
                        onChange={() => toggleAluno(aluno.al_id)}
                      />
                      <label htmlFor={`aluno-${aluno.al_id}`}>
                        {aluno.al_nome}
                      </label>
                    </div>
                  ))}
                </div>
                {selectedAlunos.length > 0 && (
                  <div className="selected-alunos">
                    {alunos
                      .filter((a) => selectedAlunos.includes(a.al_id))
                      .map((aluno) => (
                        <span className="tag" key={aluno.al_id}>
                          {aluno.al_nome}
                          <button
                            type="button"
                            className="remove"
                            onClick={() => toggleAluno(aluno.al_id)}
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                  </div>
                )}
              </>
            ) : (
              <p>Nenhum aluno disponível.</p>
            )}
          </div>

          <div className="treino-section">
            <h3>Exercícios</h3>
            <div className="exercises-container">
              <div className="exercises-header">
                <h4>Lista de Exercícios</h4>
                <button type="button" className="add-btn" onClick={addExercise}>
                  <Plus size={14} style={{ marginRight: "4px" }} />
                  Adicionar Exercício
                </button>
              </div>
              {exercises.length === 0 ? (
                <div
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#999",
                  }}
                >
                  Nenhum exercício adicionado. Clique em "Adicionar Exercício"
                  para começar.
                </div>
              ) : (
                <div className="exercises-list">
                  {exercises.map((ex, idx) => (
                    <div key={ex.id} className="exercise-item">
                      <div className="exercise-header">
                        <div className="exercise-name">
                          {idx + 1}. Exercício
                        </div>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => removeExercise(ex.id)}
                        >
                          <Trash size={16} />
                        </button>
                      </div>

                      <select
                        value={ex.ex_id || ""}
                        onChange={(ev) => {
                          const selected = allExercises.find(
                            (a) => String(a.ex_id) === String(ev.target.value)
                          );
                          updateExercise(
                            ex.id,
                            "ex_id",
                            selected?.ex_id || null
                          );
                          updateExercise(
                            ex.id,
                            "nome",
                            selected?.ex_nome || ""
                          );
                          updateExercise(
                            ex.id,
                            "intrucao",
                            selected?.ex_instrucao || ""
                          );
                        }}
                        style={{ marginBottom: "12px" }}
                      >
                        <option value="">Selecionar exercício...</option>
                        {allExercises.map((a) => (
                          <option key={a.ex_id} value={a.ex_id}>
                            {a.ex_nome}
                          </option>
                        ))}
                      </select>

                      <div className="exercise-controls">
                        <input
                          type="number"
                          placeholder="Séries"
                          value={ex.series}
                          onChange={(e) =>
                            updateExercise(ex.id, "series", e.target.value)
                          }
                        />
                        <input
                          type="number"
                          placeholder="Repetições"
                          value={ex.repeticoes}
                          onChange={(e) =>
                            updateExercise(ex.id, "repeticoes", e.target.value)
                          }
                        />
                        <input
                          type="number"
                          placeholder="Descanso (s)"
                          value={ex.descanso}
                          onChange={(e) =>
                            updateExercise(ex.id, "descanso", e.target.value)
                          }
                        />
                      </div>

                      {ex.intrucao && (
                        <div className="exercise-instructions">
                          <strong>Instruções:</strong> {ex.intrucao}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </form>

        <div className="treino-modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn-save" onClick={handleSave}>
            Salvar Mudanças
          </button>
        </div>
      </div>
    </div>
  );
}
