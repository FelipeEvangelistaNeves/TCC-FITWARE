import React, { useEffect, useState } from "react";
import "../../styles/pages/professor/novoTreino.scss";
import { X, Plus, Trash } from "lucide-react";

export default function EditarTreino({ treino, onClose, onSaved }) {
  // Se o componente for renderizado apenas quando treino existe, ainda protegemos:
  if (!treino && !onClose) return null;

  // Form fields (pré-preenchidos quando `treino` é passado)
  const [name, setName] = useState(treino?.tr_nome ?? treino?.nome ?? "");
  const [description, setDescription] = useState(
    treino?.tr_descricao ?? treino?.descricao ?? ""
  );
  const [difficulty, setDifficulty] = useState(
    treino?.tr_dificuldade ?? treino?.dificuldade ?? "Leve"
  );

  // Exercícios locais — inicial com os do treino (se existirem) ou vazio
  const initialExercises =
    treino?.exercicios?.map((ex) => ({
      id: ex.ex_id ?? Math.random().toString(36).slice(2, 9),
      ex_id: ex.ex_id,
      nome: ex.nome ?? "",
      series: ex.series ?? "",
      repeticoes: ex.repeticoes ?? "",
      descanso: ex.descanso ?? "60",
      intrucao: ex.instrucao ?? "",
    })) || [];

  const [exercises, setExercises] = useState(initialExercises);
  const [allExercises, setAllExercises] = useState([]);
  const [loadingExercises, setLoadingExercises] = useState(false);
  const [exerciseFilter, setExerciseFilter] = useState("");

  // Estado para alunos
  const [alunos, setAlunos] = useState([]);
  const [selectedAlunos, setSelectedAlunos] = useState([]);
  const [loadingAlunos, setLoadingAlunos] = useState(false);

  // Buscar alunos ao montar
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
    // buscar exercícios do sistema
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

  // Mantém o form sincronizado se o prop `treino` mudar
  useEffect(() => {
    setName(treino?.tr_nome ?? treino?.nome ?? "");
    setDescription(treino?.tr_descricao ?? treino?.descricao ?? "");
    setDifficulty(treino?.tr_dificuldade ?? treino?.dificuldade ?? "Leve");

    const inits =
      treino?.exercicios?.map((ex) => ({
        id: ex.ex_id ?? Math.random().toString(36).slice(2, 9),
        ex_id: ex.ex_id,
        nome: ex.nome ?? "",
        series: ex.series ?? "",
        repeticoes: ex.repeticoes ?? "",
        descanso: ex.descanso ?? "60",
        intrucao: ex.instrucao ?? "",
      })) || [];

    setExercises(inits);

    // Se o treino vier apenas com informações mínimas (sem ex_id), buscar detalhes completos
    const fetchDetalhes = async () => {
      if (!treino?.tr_id && !treino?.id) return;
      try {
        const trId = treino.tr_id ?? treino.id;
        const r = await fetch(
          `${import.meta.env.VITE_BASE_URL}/treinos/detalhes/${trId}`
        );
        if (!r.ok) return;
        const data = await r.json();

        // Carregar exercícios detalhados
        const full = (data.exercicios || []).map((ex) => ({
          id: ex.ex_id ?? Math.random().toString(36).slice(2, 9),
          ex_id: ex.ex_id,
          nome: ex.nome,
          series: ex.series,
          repeticoes: ex.repeticoes,
          descanso: ex.descanso ?? "60",
          intrucao: ex.instrucao || "",
        }));
        if (full.length > 0) setExercises(full);

        // Carregar alunos associados
        if (data.alunos && Array.isArray(data.alunos)) {
          setSelectedAlunos(data.alunos.map((a) => a.al_id));
        } else {
          setSelectedAlunos([]);
        }
      } catch (err) {
        console.error("Erro ao carregar detalhes do treino:", err);
        setSelectedAlunos([]);
      }
    };

    fetchDetalhes();
  }, [treino]);

  const toggleAluno = (id) => {
    setSelectedAlunos((prev) =>
      prev.includes(id) ? prev.filter((al_id) => al_id !== id) : [...prev, id]
    );
  };

  // Adiciona exercício vazio
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
              ? {
                  ...ex,
                  ex_id: exercicio.ex_id,
                  nome: exercicio.ex_nome,
                  intrucao: exercicio.ex_instrucao || "",
                }
              : ex
          )
        );
      }
    } catch (error) {
      console.error("Erro ao criar exercício:", error);
      alert("Erro ao criar exercício");
    }
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
        ex_id: ex.ex_id ?? undefined,
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
      alunos: selectedAlunos.length === 0 ? [] : selectedAlunos,
      exercicios: exerciciosPayload,
    };

    try {
      if (!treino || (!treino.tr_id && !treino.id))
        throw new Error("ID do treino ausente");

      const trId = treino.tr_id ?? treino.id;
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/treinos/professor/${trId}`,
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

  // Fecha ao clicar no overlay
  const handleOverlayClick = () => {
    if (typeof onClose === "function") onClose();
  };

  return (
    <div className="novo-treino-overlay" onClick={handleOverlayClick}>
      <aside
        className="novo-treino-drawer"
        onClick={(e) => e.stopPropagation()} // evita fechamento ao clicar dentro
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <header className="drawer-header">
          <button aria-label="Fechar" className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
          <h2 id="drawer-title">
            {treino ? "Editar Treino" : "Criar Novo Treino"}
          </h2>
        </header>

        <form className="drawer-body" onSubmit={handleSave}>
          {/* Nome */}
          <label className="field">
            <span className="label-title">Nome do Treino</span>
            <input
              type="text"
              value={name}
              placeholder="Ex: Treino de Força"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          {/* Dificuldade */}
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

          {/* Selecionar Alunos */}
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

          {/* Alunos Selecionados (Resumo) */}
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

          {/* Exercícios */}
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

                    <select
                      value={ex.ex_id || ""}
                      onChange={(ev) => {
                        const selected = allExercises.find(
                          (a) => String(a.ex_id) === String(ev.target.value)
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
                      className="remove-ex-btn"
                      onClick={() => removeExercise(ex.id)}
                      aria-label={`Remover exercício ${idx + 1}`}
                    >
                      <Trash size={14} />
                    </button>
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
                    placeholder="Instruções (opcional)"
                    value={ex.intrucao}
                    onChange={(e) =>
                      updateExercise(ex.id, "intrucao", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Descrição */}
          <label className="field">
            <span className="label-title">Descrição</span>
            <textarea
              placeholder="Descrição do treino..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </form>

        <footer className="drawer-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={handleSave}>
            {treino ? "Salvar Mudanças" : "Enviar Treino"}
          </button>
        </footer>
      </aside>
    </div>
  );
}
