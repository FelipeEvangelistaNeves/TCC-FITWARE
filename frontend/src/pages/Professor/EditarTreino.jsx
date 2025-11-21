import React, { useEffect, useState } from "react";
import "../../styles/pages/professor/novoTreino.scss";
import { X, Plus, Trash } from "lucide-react";

export default function EditarTreino({ treino, onClose }) {
  // Se o componente for renderizado apenas quando treino existe, ainda protegemos:
  if (!treino && !onClose) return null;

  // Form fields (pré-preenchidos quando `treino` é passado)
  const [name, setName] = useState(treino?.tr_nome ?? "");
  const [description, setDescription] = useState(treino?.tr_descricao ?? "");
  const [category, setCategory] = useState(treino?.tr_categoria ?? "Força");

  // Exercícios locais — inicial com os do treino (se existirem) ou vazio
  const initialExercises =
    treino?.Exercicios?.map((ex) => ({
      id: ex.ex_id ?? Math.random().toString(36).slice(2, 9),
      nome: ex.ex_nome ?? "",
      series: ex.ex_series ?? "",
      repeticoes: ex.ex_repeticoes ?? "",
      observacoes: ex.ex_observacoes ?? "",
    })) || [];

  const [exercises, setExercises] = useState(initialExercises);

  // Mantém o form sincronizado se o prop `treino` mudar
  useEffect(() => {
    setName(treino?.tr_nome ?? "");
    setDescription(treino?.tr_descricao ?? "");
    setCategory(treino?.tr_categoria ?? "Força");

    const inits =
      treino?.Exercicios?.map((ex) => ({
        id: ex.ex_id ?? Math.random().toString(36).slice(2, 9),
        nome: ex.ex_nome ?? "",
        series: ex.ex_series ?? "",
        repeticoes: ex.ex_repeticoes ?? "",
        observacoes: ex.ex_observacoes ?? "",
      })) || [];

    setExercises(inits);
  }, [treino]);

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

  const removeExercise = (id) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const updateExercise = (id, key, value) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, [key]: value } : ex))
    );
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Monta payload mínimo — aqui você pode integrar a API
    const payload = {
      tr_nome: name,
      tr_descricao: description,
      tr_categoria: category,
      exercicios: exercises.map(({ id, ...rest }) => rest),
    };

    console.log("Salvar treino payload:", payload);

    // TODO: chamar API para salvar/atualizar treino
    // Ex: await fetch(...)

    // Fecha após salvar (ou aguardar retorno)
    if (typeof onClose === "function") onClose();
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
          <button className="save-btn" onClick={handleSave}>
            Salvar
          </button>
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

          {/* Categoria */}
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

          {/* Selecionar Alunos (placeholder - pronto para integrar) */}
          <label className="field">
            <span className="label-title">Selecionar Alunos</span>
            <div className="select-placeholder">
              Selecione os alunos (implementar)
            </div>
          </label>

          {/* Alunos Selecionados (placeholder visual) */}
          <div className="selected-alunos">
            <span className="subtitle">Alunos Selecionados</span>
            <div className="tags">
              {/* Exemplo estático — integrar com seleção real */}
              <span className="tag">
                Maria Silva <button className="tag-remove" />
              </span>
              <span className="tag">
                Pedro Alves <button className="tag-remove" />
              </span>
            </div>
          </div>

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
                    <input
                      className="exercise-name"
                      placeholder="Nome do exercício"
                      value={ex.nome}
                      onChange={(e) =>
                        updateExercise(ex.id, "nome", e.target.value)
                      }
                    />
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
              ))}
            </div>
          </div>

          {/* Anexar vídeo (placeholder) */}
          <label className="field">
            <span className="label-title">Anexar Vídeo (opcional)</span>
            <div className="file-placeholder">
              Toque para fazer upload (implementar)
            </div>
          </label>

          {/* Observações gerais */}
          <label className="field">
            <span className="label-title">Observações Gerais</span>
            <textarea
              placeholder="Adicione observações gerais sobre o treino..."
              value={treino?.tr_observacoes ?? ""}
              onChange={() => {}}
              disabled
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
