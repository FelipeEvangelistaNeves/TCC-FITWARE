import React, { useEffect, useState } from "react";
import "../../styles/pages/professor/novoTreino.scss";
import { X, Plus, Trash } from "lucide-react";

export default function NovoTreino({ onClose, onSaved }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Força");
  const [observations, setObservations] = useState("");

  const [exercises, setExercises] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [loadingExercises, setLoadingExercises] = useState(false);
  const [exerciseFilter, setExerciseFilter] = useState("");

  // Estado para alunos
  const [alunos, setAlunos] = useState([]);
  const [selectedAlunos, setSelectedAlunos] = useState([]);
  const [loadingAlunos, setLoadingAlunos] = useState(false);

  useEffect(() => {
    const fetchAlunos = async () => {
      setLoadingAlunos(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/professor/allAlunos`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Erro ao buscar alunos");
        const data = await res.json();
        setAlunos(data.alunos || []);
      } catch (error) {
        console.error("Erro ao carregar alunos:", error);
      } finally {
        setLoadingAlunos(false);
      }
    };

    fetchAlunos();

    // buscar todos os exercícios do sistema
    const fetchExs = async () => {
      setLoadingExercises(true);
      try {
        const r = await fetch(
          `${import.meta.env.VITE_BASE_URL}/professor/exercicios`,
          { credentials: "include" }
        );
        if (!r.ok) throw new Error("Erro ao buscar exercícios");
        const data = await r.json();
        setAllExercises(data.exercicios || []);
      } catch (err) {
        console.error("Erro ao carregar exercícios:", err);
      } finally {
        setLoadingExercises(false);
      }
    };

    fetchExs();
  }, []);

  const toggleAluno = (id) => {
    setSelectedAlunos((prev) =>
      prev.includes(id) ? prev.filter((al_id) => al_id !== id) : [...prev, id]
    );
  };

  const addExercise = () => {
    setExercises((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2, 9),
        nome: "",
        series: "",
        repeticoes: "",
        observacoes: "",
      },
    ]);
  };

  const handleCreateExercise = async (selectId) => {
    const name = window.prompt("Nome do novo exercício:");
    if (!name) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/professor/exercicios`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ex_nome: name }),
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Falha ao criar exercício");
        return;
      }
      const { exercicio } = await res.json();
      setAllExercises((prev) => [exercicio, ...prev]);

      if (selectId) {
        setExercises((prev) =>
          prev.map((ex) =>
            ex.id === selectId
              ? { ...ex, ex_id: exercicio.ex_id, nome: exercicio.ex_nome }
              : ex
          )
        );
      }
    } catch (error) {
      console.error("Erro ao criar exercício:", error);
      alert("Erro ao criar exercício");
    }
  };

  const removeExercise = (id) =>
    setExercises((prev) => prev.filter((ex) => ex.id !== id));

  const updateExercise = (id, key, value) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, [key]: value } : ex))
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      tr_nome: name,
      tr_descricao: description,
      tr_categoria: category,
      tr_observacoes: observations,
      alunos: selectedAlunos,
      exercicios: exercises.map(({ id, ...rest }) => rest),
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/treinos/professor`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Erro ao criar treino:", err);
        alert(err.error || "Falha ao criar treino");
        return;
      }

      // sucesso
      if (typeof onSaved === "function") onSaved();
      if (typeof onClose === "function") onClose();
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      alert("Erro de rede ao criar treino");
    }
  };

  const handleOverlayClick = () => {
    if (typeof onClose === "function") onClose();
  };

  return (
    <div className="novo-treino-overlay" onClick={handleOverlayClick}>
      <aside
        className="novo-treino-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <header className="drawer-header">
          <button aria-label="Fechar" className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
          <h2 id="drawer-title">Criar Novo Treino</h2>
        </header>

        <form className="drawer-body" onSubmit={handleSave}>
          <label className="field">
            <span className="label-title">Nome do Treino</span>
            <input
              type="text"
              value={name}
              placeholder="Ex: Treino de Força"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="label-title">Categoria</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Força</option>
              <option>Cardio</option>
              <option>Funcional</option>
              <option>Mobilidade</option>
            </select>
          </label>

          <label className="field">
            <span className="label-title">Selecionar Alunos</span>
            <div className="alunos-selection-list">
              {loadingAlunos ? (
                <p className="loading-text">Carregando alunos...</p>
              ) : alunos.length === 0 ? (
                <p className="empty-text">Nenhum aluno encontrado.</p>
              ) : (
                alunos.map((aluno) => (
                  <label key={aluno.al_id} className="aluno-checkbox-item">
                    <input
                      type="checkbox"
                      checked={selectedAlunos.includes(aluno.al_id)}
                      onChange={() => toggleAluno(aluno.al_id)}
                    />
                    <span className="aluno-name">{aluno.al_nome}</span>
                  </label>
                ))
              )}
            </div>
          </label>

          {selectedAlunos.length > 0 && (
            <div className="selected-alunos">
              <span className="subtitle">
                {selectedAlunos.length} Aluno(s) Selecionado(s)
              </span>
              <div className="tags">
                {alunos
                  .filter((a) => selectedAlunos.includes(a.al_id))
                  .map((aluno) => (
                    <span className="tag" key={aluno.al_id}>
                      {aluno.al_nome}
                      <button
                        type="button"
                        className="tag-remove"
                        onClick={() => toggleAluno(aluno.al_id)}
                      />
                    </span>
                  ))}
              </div>
            </div>
          )}

          <div className="exercises-section">
            <div className="exercises-header">
              <h3>Exercícios</h3>
              <button
                type="button"
                className="add-ex-btn"
                onClick={addExercise}
              >
                <Plus size={14} /> Adicionar
              </button>
            </div>

            {exercises.length === 0 && (
              <p className="muted">Nenhum exercício adicionado.</p>
            )}

            <div className="exercises-list">
              {exercises.map((ex, idx) => (
                <div className="exercise-card" key={ex.id}>
                  <div className="exercise-top">
                    <div className="exercise-index">{idx + 1}</div>
                    <div
                      style={{ display: "flex", gap: 8, alignItems: "center" }}
                    >
                      <input
                        className="exercise-search"
                        placeholder="Pesquisar exercícios..."
                        value={exerciseFilter}
                        onChange={(e) => setExerciseFilter(e.target.value)}
                      />
                      <select
                        value={ex.ex_id || ""}
                        onChange={(ev) => {
                          const selected = allExercises.find(
                            (a) => String(a.ex_id) === String(ev.target.value)
                          );
                          updateExercise(
                            ex.id,
                            "ex_id",
                            selected ? selected.ex_id : undefined
                          );
                          updateExercise(
                            ex.id,
                            "nome",
                            selected ? selected.ex_nome : ev.target.value
                          );
                        }}
                      >
                        <option value="">-- selecionar exercício --</option>
                        {allExercises
                          .filter((a) =>
                            a.ex_nome
                              .toLowerCase()
                              .includes(exerciseFilter.toLowerCase())
                          )
                          .map((a) => (
                            <option key={a.ex_id} value={a.ex_id}>
                              {a.ex_nome}
                            </option>
                          ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => handleCreateExercise(ex.id)}
                        className="add-new-ex-btn"
                      >
                        Criar exercício
                      </button>
                      <button
                        type="button"
                        className="remove-ex-btn"
                        onClick={() => removeExercise(ex.id)}
                        aria-label={`Remover exercício ${idx + 1}`}
                      >
                        <Trash size={14} />
                      </button>
                    </div>

                    <div className="exercise-controls">
                      <input
                        className="small"
                        placeholder="Séries"
                        value={ex.series}
                        onChange={(e) =>
                          updateExercise(ex.id, "series", e.target.value)
                        }
                      />
                      <input
                        className="small"
                        placeholder="Reps"
                        value={ex.repeticoes}
                        onChange={(e) =>
                          updateExercise(ex.id, "repeticoes", e.target.value)
                        }
                      />
                    </div>

                    <textarea
                      className="exercise-notes"
                      placeholder="Observações (opcional)"
                      value={ex.observacoes}
                      onChange={(e) =>
                        updateExercise(ex.id, "observacoes", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <label className="field">
            <span className="label-title">Observações Gerais</span>
            <textarea
              placeholder="Adicione observações gerais sobre o treino..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
            />
          </label>
        </form>

        <footer className="drawer-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Enviar Treino
          </button>
        </footer>
      </aside>
    </div>
  );
}
