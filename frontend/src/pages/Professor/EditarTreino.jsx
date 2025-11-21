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
  const [observations, setObservations] = useState(
    treino?.tr_observacoes ?? ""
  );

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
          "http://localhost:3000/api/professor/allAlunos",
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
  }, []);

  // Mantém o form sincronizado se o prop `treino` mudar
  useEffect(() => {
    setName(treino?.tr_nome ?? "");
    setDescription(treino?.tr_descricao ?? "");
    setCategory(treino?.tr_categoria ?? "Força");
    setObservations(treino?.tr_observacoes ?? "");

    // Se o treino já tiver alunos associados, preencher aqui
    // Ex: setSelectedAlunos(treino.Alunos.map(a => a.al_id));
    // Por enquanto, resetamos ou mantemos vazio se não vier do backend
    setSelectedAlunos([]);

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
      tr_observacoes: observations,
      alunos: selectedAlunos, // IDs dos alunos selecionados
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

          {/* Observações gerais */}
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
            {treino ? "Salvar Mudanças" : "Enviar Treino"}
          </button>
        </footer>
      </aside>
    </div>
  );
}
