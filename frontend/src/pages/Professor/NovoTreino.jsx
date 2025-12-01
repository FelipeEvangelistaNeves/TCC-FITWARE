import React, { useEffect, useState } from "react";
import "../../styles/pages/professor/novoTreino.scss";
import { X, Plus, Trash } from "lucide-react";

export default function NovoTreino({ onClose, onSaved }) {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("Leve");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState([]);
  const [allExercises, setAllExercises] = useState([]);

  const [alunos, setAlunos] = useState([]);
  const [selectedAlunos, setSelectedAlunos] = useState([]);
  const [loadingAlunos, setLoadingAlunos] = useState(false);
  const [loadingExercises, setLoadingExercises] = useState(false);
  const [errors, setErrors] = useState({}); // Estado para erros de validação

  useEffect(() => {
    const fetchData = async () => {
      setLoadingAlunos(true);
      setLoadingExercises(true);

      try {
        const resAlunos = await fetch(
          `${import.meta.env.VITE_BASE_URL}/professor/allAlunos`,
          { credentials: "include" }
        );
        const alunosData = await resAlunos.json();
        setAlunos(alunosData.alunos || []);
      } catch (e) {}

      try {
        const resEx = await fetch(
          `${import.meta.env.VITE_BASE_URL}/professor/exercicios`,
          { credentials: "include" }
        );
        const exData = await resEx.json();
        setAllExercises(exData.exercicios || []);
      } catch (e) {}

      setLoadingExercises(false);
      setLoadingAlunos(false);
    };

    fetchData();
  }, []);

  const toggleAluno = (id) => {
    setSelectedAlunos((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allIds = alunos.map((a) => a.al_id);
    setSelectedAlunos(allIds);
  };

  const handleDeselectAll = () => {
    setSelectedAlunos([]);
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

  const removeExercise = (id) =>
    setExercises((prev) => prev.filter((ex) => ex.id !== id));

  const updateExercise = (id, key, value) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, [key]: value } : ex))
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "O nome do treino é obrigatório.";
    if (name.length > 50)
      newErrors.name = "O nome deve ter no máximo 50 caracteres.";
    if (description.length > 200)
      newErrors.description = "A descrição deve ter no máximo 200 caracteres.";
    if (exercises.length === 0)
      newErrors.exercises = "Adicione pelo menos um exercício.";

    // Validar exercícios individuais
    const invalidExercises = exercises.some((ex) => !ex.ex_id && !ex.nome);
    if (invalidExercises)
      newErrors.exercises = "Preencha ou selecione todos os exercícios.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      tr_nome: name,
      tr_descricao: description,
      tr_dificuldade: difficulty,
      alunos: selectedAlunos.length === 0 ? [] : selectedAlunos,
      exercicios: exercises
        .map(({ id, ...ex }) => ex)
        .filter((ex) => ex.ex_id || ex.nome),
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

      if (res.ok) {
        if (typeof onSaved === "function") onSaved();
        onClose();
      } else {
        const data = await res.json();
        alert(data.message || "Erro ao criar treino");
      }
    } catch (e) {
      alert("Erro ao criar treino");
    }
  };

  return (
    <div className="novo-treino-overlay" onClick={onClose}>
      <aside
        className="novo-treino-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <header className="drawer-header">
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
          <h2>Novo Treino</h2>
        </header>

        {/* BODY */}
        <form className="drawer-body" onSubmit={handleSave}>
          <label className="field">
            <span className="label-title">Nome do Treino</span>
            <input
              type="text"
              placeholder="Ex.: Treino A – Força"
              value={name}
              // required removido para usar validação customizada
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: null });
              }}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </label>
          <label className="field">
            <span className="label-title">Dificuldade</span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option>Leve</option>
              <option>Moderado</option>
              <option>Difícil</option>
              <option>Intenso</option>
            </select>
          </label>

          <label className="field">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span className="label-title">Selecionar Alunos</span>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  style={{
                    background: "var(--surface-3)",
                    border: "1px solid var(--border-color)",
                    color: "var(--color-text)",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Todos
                </button>
                <button
                  type="button"
                  onClick={handleDeselectAll}
                  style={{
                    background: "var(--surface-3)",
                    border: "1px solid var(--border-color)",
                    color: "var(--color-text)",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Nenhum
                </button>
              </div>
            </div>
            <div className="alunos-selection-list">
              {loadingAlunos ? (
                <p className="loading-text">Carregando...</p>
              ) : alunos.length === 0 ? (
                <p className="empty-text">Nenhum aluno encontrado.</p>
              ) : (
                alunos.map((a) => (
                  <label key={a.al_id} className="aluno-checkbox-item">
                    <input
                      type="checkbox"
                      checked={selectedAlunos.includes(a.al_id)}
                      onChange={() => toggleAluno(a.al_id)}
                    />
                    <span className="aluno-name">{a.al_nome}</span>
                  </label>
                ))
              )}
            </div>
          </label>
          {selectedAlunos.length > 0 && (
            <div className="selected-alunos">
              <span className="subtitle">
                {selectedAlunos.length} selecionado(s)
              </span>
              <div className="tags">
                {alunos
                  .filter((a) => selectedAlunos.includes(a.al_id))
                  .map((al) => (
                    <span className="tag" key={al.al_id}>
                      {al.al_nome}
                      <button
                        className="tag-remove"
                        onClick={() => toggleAluno(al.al_id)}
                      />
                    </span>
                  ))}
              </div>
            </div>
          )}
          {/* EXERCÍCIOS */}
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
            {errors.exercises && (
              <p className="error-msg">{errors.exercises}</p>
            )}

            <div className="exercises-list">
              {exercises.map((ex, index) => (
                <div className="exercise-card" key={ex.id}>
                  <div className="exercise-top">
                    <div className="exercise-index">{index + 1}</div>
                    <div className="a">
                      <button
                        type="button"
                        className="remove-ex-btn"
                        onClick={() => removeExercise(ex.id)}
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                    <select
                      value={ex.ex_id || ""}
                      onChange={(ev) => {
                        const selected = allExercises.find(
                          (a) => String(a.ex_id) === ev.target.value
                        );
                        updateExercise(ex.id, "ex_id", selected?.ex_id || null);
                        updateExercise(ex.id, "nome", selected?.ex_nome || "");
                        updateExercise(
                          ex.id,
                          "intrucao",
                          selected?.ex_instrucao || ""
                        );
                      }}
                    >
                      <option value="">Selecionar exercício...</option>
                      {allExercises.map((a) => (
                        <option key={a.ex_id} value={a.ex_id}>
                          {a.ex_nome}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="exercise-controls">
                    <input
                      placeholder="Séries"
                      value={ex.series}
                      onChange={(e) =>
                        updateExercise(ex.id, "series", e.target.value)
                      }
                    />
                    <input
                      placeholder="Repetições"
                      value={ex.repeticoes}
                      onChange={(e) =>
                        updateExercise(ex.id, "repeticoes", e.target.value)
                      }
                    />
                    <input
                      placeholder="Descanso (s)"
                      value={ex.descanso}
                      onChange={(e) =>
                        updateExercise(ex.id, "descanso", e.target.value)
                      }
                    />
                  </div>

                  <textarea
                    className="exercise-notes"
                    placeholder="Instruções do exercício"
                    value={ex.intrucao}
                    readOnly
                    onChange={(e) =>
                      updateExercise(ex.id, "intrucao", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <label className="field">
            <span className="label-title">Descrição</span>
            <textarea
              placeholder="Descrição do treino..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description)
                  setErrors({ ...errors, description: null });
              }}
              className={errors.description ? "input-error" : ""}
            />
            {errors.description && (
              <span className="error-msg">{errors.description}</span>
            )}
          </label>
        </form>

        {/* FOOTER */}
        <footer className="drawer-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Salvar
          </button>
        </footer>
      </aside>
    </div>
  );
}
