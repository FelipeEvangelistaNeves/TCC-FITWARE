import React, { useState, useEffect } from "react";
import "../../styles/pages/admin/tabelas.scss";
import "../../styles/pages/admin/forms.scss";
import "../../styles/pages/admin/exercicios.scss";
import ExcluirExercicio from "./ExcluirExercicio";
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

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // State para modal de deleção
  const [exercicioParaExcluir, setExercicioParaExcluir] = useState(null);

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

  // Lógica de Paginação
  const totalPages = Math.ceil(exerciciosFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const exerciciosPaginados = exerciciosFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

  // Abrir modal de deleção
  const handleDeleteClick = (ex) => {
    setExercicioParaExcluir(ex);
  };

  // Confirmar deleção
  const confirmDelete = async () => {
    if (!exercicioParaExcluir) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/exercicios/${
          exercicioParaExcluir.ex_id
        }`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Erro ao deletar exercício");

      setExercicios((prev) =>
        prev.filter((ex) => ex.ex_id !== exercicioParaExcluir.ex_id)
      );
      setExercicioParaExcluir(null);
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar exercício");
    }
  };

  if (erro) return <p>{erro}</p>;

  return (
    <div className="admin-modal tabela-page">
      {/* Header da Tabela */}
      <div className="tabela-header">
        <h2>Gerenciar Exercícios</h2>
        <div className="acoes-header">
          <input
            type="text"
            placeholder="Buscar exercício..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Volta pra pág 1 ao buscar
            }}
          />
          <button className="add-btn" onClick={() => setShowForm(true)}>
            + Adicionar Exercício
          </button>
        </div>
      </div>

      {/* Tabela */}
      <table className="tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Grupo Muscular</th>
            <th>Instruções</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {exerciciosPaginados.length > 0 ? (
            exerciciosPaginados.map((ex) => (
              <tr key={ex.ex_id}>
                <td className="user-info">{ex.ex_nome}</td>
                <td>
                  <span className="nivel intermediario">
                    {ex.ex_grupo_muscular || "Geral"}
                  </span>
                </td>
                <td
                  style={{
                    maxWidth: "300px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={ex.ex_instrucao}
                >
                  {ex.ex_instrucao || "—"}
                </td>
                <td>
                  <button className="action-btn" onClick={() => handleEdit(ex)}>
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => handleDeleteClick(ex)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhum exercício encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="paginacao">
        <span>Itens por página:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>

        <div className="pages">
          <button
            className="page"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="page"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingId ? "Editar Exercício" : "Adicionar Exercício"}</h3>

            <form className="form-card" onSubmit={handleSave}>
              {/* Nome */}
              <div className="form-group">
                <label>Nome do Exercício *</label>
                <input
                  type="text"
                  value={formData.ex_nome}
                  onChange={(e) =>
                    setFormData({ ...formData, ex_nome: e.target.value })
                  }
                  placeholder="Ex.: Supino Reto"
                  required
                />
              </div>

              {/* Grupo Muscular */}
              <div className="form-group">
                <label>Grupo Muscular *</label>
                <select
                  value={formData.ex_grupo_muscular}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ex_grupo_muscular: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Selecione...</option>
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
              </div>

              {/* Instruções */}
              <div className="form-group">
                <label>Instruções</label>
                <textarea
                  value={formData.ex_instrucao}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ex_instrucao: e.target.value,
                    })
                  }
                  placeholder="Descreva como executar o exercício..."
                ></textarea>
              </div>
            </form>

            {/* Ações */}
            <div className="modal-actions">
              <button className="btn-cancelar" onClick={resetForm}>
                Cancelar
              </button>
              <button className="btn-salvar" onClick={handleSave}>
                {editingId ? "Salvar Alterações" : "Criar Exercício"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Exclusão */}
      <ExcluirExercicio
        exercicio={exercicioParaExcluir}
        onClose={() => setExercicioParaExcluir(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
