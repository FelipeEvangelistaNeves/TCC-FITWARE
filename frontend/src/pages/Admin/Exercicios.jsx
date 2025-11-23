import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/mensagensAluno.scss";
import "../../styles/pages/aluno/dashboardAluno.scss";
import "../../styles/pages/aluno/treinos.scss";

export default function Exercicios() {
  const [exercicios, setExercicios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [erro, setErro] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    ex_nome: "",
    ex_instrucao: "",
    ex_grupo_muscular: "",
  });

  // Fetch exercícios
  const fetchExercicios = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/professor/exercicios`,
        {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json; charset=utf-8" },
        }
      );

      if (!res.ok) throw new Error("Erro ao buscar exercícios");

      const data = await res.json();
      setExercicios(data.exercicios || []);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar os exercícios.");
    }
  };

  useEffect(() => {
    fetchExercicios();
  }, []);

  // Filtrar exercícios
  const exerciciosFiltrados = exercicios.filter((ex) => {
    const texto = searchTerm.toLowerCase();
    return (
      ex.ex_nome?.toLowerCase().includes(texto) ||
      ex.ex_instrucao?.toLowerCase().includes(texto) ||
      ex.ex_grupo_muscular?.toLowerCase().includes(texto)
    );
  });

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      ex_nome: "",
      ex_instrucao: "",
      ex_grupo_muscular: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  // Editar exercício
  const handleEdit = (ex) => {
    setFormData({
      ex_nome: ex.ex_nome,
      ex_instrucao: ex.ex_instrucao || "",
      ex_grupo_muscular: ex.ex_grupo_muscular || "",
    });
    setEditingId(ex.ex_id);
    setShowForm(true);
  };

  // Salvar exercício
  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.ex_nome.trim()) {
      alert("Nome do exercício é obrigatório");
      return;
    }

    try {
      const url = editingId
        ? `${import.meta.env.VITE_BASE_URL}/admin/exercicios/${editingId}`
        : `${import.meta.env.VITE_BASE_URL}/professor/exercicios`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erro ao salvar exercício");

      if (editingId) {
        setExercicios((prev) =>
          prev.map((ex) =>
            ex.ex_id === editingId ? { ...ex, ...formData } : ex
          )
        );
      } else {
        const { exercicio } = await res.json();
        setExercicios((prev) => [exercicio, ...prev]);
      }

      resetForm();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar exercício");
    }
  };

  // Deletar exercício
  const handleDelete = async (ex_id) => {
    if (!window.confirm("Tem certeza que deseja deletar este exercício?"))
      return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/exercicios/${ex_id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Erro ao deletar exercício");

      setExercicios((prev) => prev.filter((ex) => ex.ex_id !== ex_id));
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar exercício");
    }
  };

  if (erro) return <p>{erro}</p>;

  return (
    <div className="dashboard-aluno">
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar exercício..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="novo-treino-overlay" onClick={resetForm}>
          <div
            className="novo-treino-drawer"
            onClick={(e) => e.stopPropagation()}
            style={{ width: "400px" }}
          >
            <header className="drawer-header">
              <h2>{editingId ? "Editar Exercício" : "Novo Exercício"}</h2>
              <button
                className="icon-btn"
                onClick={resetForm}
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                }}
              >
                ✕
              </button>
            </header>

            <form className="drawer-body" onSubmit={handleSave}>
              <label className="field">
                <span className="label-title">Nome do Exercício</span>
                <input
                  type="text"
                  placeholder="Ex.: Supino"
                  value={formData.ex_nome}
                  onChange={(e) =>
                    setFormData({ ...formData, ex_nome: e.target.value })
                  }
                />
              </label>

              <label className="field">
                <span className="label-title">Grupo Muscular</span>
                <select
                  value={formData.ex_grupo_muscular}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ex_grupo_muscular: e.target.value,
                    })
                  }
                >
                  <option value="">Selecione um grupo muscular</option>
                  <option value="Peito">Peito</option>
                  <option value="Costas">Costas</option>
                  <option value="Pernas">Pernas</option>
                  <option value="Ombros">Ombros</option>
                  <option value="Bíceps">Bíceps</option>
                  <option value="Tríceps">Tríceps</option>
                  <option value="Abdômen">Abdômen</option>
                  <option value="Glúteos">Glúteos</option>
                  <option value="Cardio">Cardio</option>
                </select>
              </label>

              <label className="field">
                <span className="label-title">Instruções</span>
                <textarea
                  placeholder="Descreva como executar o exercício..."
                  value={formData.ex_instrucao}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ex_instrucao: e.target.value,
                    })
                  }
                  rows="4"
                />
              </label>
            </form>

            <footer className="drawer-footer">
              <button className="btn-cancel" onClick={resetForm}>
                Cancelar
              </button>
              <button className="btn-primary" onClick={handleSave}>
                Salvar
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* Lista de Exercícios */}
      <section className="workouts-section">
        {exerciciosFiltrados.length === 0 ? (
          <p>Nenhum exercício encontrado.</p>
        ) : (
          exerciciosFiltrados.map((ex) => (
            <div className="workout-card" key={ex.ex_id}>
              <div className="workout-header">
                <div className="workout-info">
                  <h3>{ex.ex_nome}</h3>
                  <span className="workout-dificuldade">
                    {ex.ex_grupo_muscular || "Sem grupo"}
                  </span>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(ex.ex_id)}
                  title="Deletar"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>

              {ex.ex_instrucao && (
                <div style={{ padding: "12px 0", fontSize: "14px" }}>
                  <p style={{ color: "var(--color-text-muted)", margin: "0" }}>
                    {ex.ex_instrucao}
                  </p>
                </div>
              )}

              <div className="treino-actions">
                <button className="start-btn" onClick={() => handleEdit(ex)}>
                  Editar
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Botão Novo */}
      <div className="treino-actions">
        <button className="new-btn" onClick={() => setShowForm(true)}>
          Adicionar Novo Exercício
        </button>
      </div>
    </div>
  );
}
