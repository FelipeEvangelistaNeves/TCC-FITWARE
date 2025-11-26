import React, { useState, useEffect } from "react";
import "../../styles/pages/admin/tabelas.scss";
import "../../styles/pages/admin/forms.scss";

// ==== IMPORTS DE MODAIS ====
import AddTreinoModal from "./AddTreinos"; // já existentes no seu projeto
import EditTreinoModal from "./EditarTreinos";
import DetalhesTreinoModal from "./DetalhesTreinos";
import DeleteTreinoModal from "./ExcluirTreino";
import EnviarTreinoModal from "./EnviarTreinos"; // novo

export default function Treinos() {
  const [activeTab, setActiveTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // ==== MODAIS ====
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedTreino, setSelectedTreino] = useState(null);

  // ==== LISTA DE TREINOS (vinda do backend) ====
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTreinos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/treinos`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Falha ao buscar treinos");
      const data = await res.json();

      const mapped = (data.treinos || data || []).map((t) => ({
        id: t.tr_id || t.id,
        nome: t.tr_nome || t.nome,
        descricao: t.tr_descricao || t.descricao || "-",
        dificuldade: t.tr_dificuldade || t.dificuldade || "-",
        exercicios: t.exercicios_count || t.exercicios || 0,
        atribuido: t.alunos_count || t.atribuido || 0,
        raw: t,
      }));

      setTreinos(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreinos();
  }, []);

  // ==== FILTROS ====
  const filteredTreinos = treinos.filter((t) => {
    const nomeMatch = t.nome.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === "recentes") {
      const dataTreino = new Date(t.data);
      const agora = new Date();
      const diffDias = (agora - dataTreino) / (1000 * 60 * 60 * 24);
      return nomeMatch && diffDias <= 7;
    }
    return nomeMatch;
  });

  // ==== PAGINAÇÃO (corrigido: totalPages e treinosExibidos definidos) ====
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTreinos.length / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const treinosExibidos = filteredTreinos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const setCurrentSafe = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  // ==== CRUD HANDLERS ====
  const handleAddTreino = () => {
    (async () => {
      try {
        await fetchTreinos();
        setShowAddModal(false);
        setCurrentPage(1);
      } catch (error) {
        console.error("Erro ao atualizar lista:", error);
      }
    })();
  };

  const handleUpdateTreino = () => {
    (async () => {
      try {
        await fetchTreinos();
        setShowEditModal(false);
      } catch (error) {
        console.error("Erro ao atualizar lista:", error);
      }
    })();
  };

  const handleDeleteTreino = (id) => {
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/treinos/${id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          alert(err.error || "Falha ao deletar treino");
          return;
        }
        await fetchTreinos();
        setShowDeleteModal(false);
      } catch (error) {
        console.error("Erro ao deletar treino:", error);
        alert("Erro ao deletar treino");
      }
    })();
  };

  const handleSendTreino = (payload) => {
    // payload = { treino, destinatarios: [...ids], mensagem }
    (async () => {
      try {
        const { treino, destinatarios } = payload;
        if (!destinatarios || destinatarios.length === 0) {
          alert("Selecione ao menos um aluno.");
          return;
        }

        let success = 0;
        for (const al of destinatarios) {
          const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}/treinos/${treino.id}/delegar`,
            {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ al_id: al }),
            }
          );
          if (res.ok) success++;
        }

        alert(`Treino "${treino.nome}" atribuído a ${success} aluno(s).`);
        setShowSendModal(false);
      } catch (err) {
        console.error("Erro ao enviar treino:", err);
        alert("Erro ao enviar treino");
      }
    })();
  };

  // abrir modais
  const openDetailsModal = (treino) => {
    setSelectedTreino(treino);
    setShowDetailsModal(true);
  };

  const openEditModal = (treino) => {
    setSelectedTreino(treino);
    setShowEditModal(true);
  };

  const openDeleteModal = (treino) => {
    setSelectedTreino(treino);
    setShowDeleteModal(true);
  };

  const openSendModal = (treino) => {
    setSelectedTreino(treino);
    setShowSendModal(true);
  };

  return (
    <div className="admin-modal">
      <div className="tabela-page">
        {/* HEADER */}
        <div className="tabela-header">
          <h2>Gerenciar Treinos</h2>
          <div className="acoes-header">
            <input
              type="text"
              placeholder="Buscar treino..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <button className="add-btn" onClick={() => setShowAddModal(true)}>
              + Criar Treino
            </button>
          </div>
        </div>

        {/* TABELA */}
        <table className="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Dificuldade</th>
              <th>Exercícios</th>
              <th>Atribuído</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {treinosExibidos.length > 0 ? (
              treinosExibidos.map((t) => (
                <tr key={t.id}>
                  <td>
                    <strong>{t.nome}</strong>
                  </td>
                  <td>{t.descricao}</td>
                  <td>{t.dificuldade}</td>
                  <td>{t.exercicios}</td>
                  <td>{t.atribuido}</td>
                  <td>
                    <button
                      className="action-btn"
                      title="Editar"
                      onClick={() => openEditModal(t)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

                    <button
                      className="action-btn"
                      title="Excluir"
                      onClick={() => openDeleteModal(t)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>

                    <button
                      className="action-btn"
                      title="Detalhes"
                      onClick={() => openDetailsModal(t)}
                    >
                      <i className="bi bi-three-dots"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="sem-resultado">
                  Nenhum treino encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINAÇÃO */}
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
              onClick={() => setCurrentSafe(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`page ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => setCurrentSafe(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="page"
              onClick={() => setCurrentSafe(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* MODAIS */}
        {showAddModal && (
          <AddTreinoModal
            onClose={() => setShowAddModal(false)}
            onSave={handleAddTreino}
          />
        )}

        {showEditModal && selectedTreino && (
          <EditTreinoModal
            treino={selectedTreino}
            onClose={() => setShowEditModal(false)}
            onSaved={handleUpdateTreino}
          />
        )}

        {showDetailsModal && selectedTreino && (
          <DetalhesTreinoModal
            treino={selectedTreino}
            onClose={() => setShowDetailsModal(false)}
          />
        )}

        {showDeleteModal && selectedTreino && (
          <DeleteTreinoModal
            treino={selectedTreino}
            onClose={() => setShowDeleteModal(false)}
            onDelete={(treino) => handleDeleteTreino(treino.id)}
          />
        )}

        {showSendModal && selectedTreino && (
          <EnviarTreinoModal
            treino={selectedTreino}
            onClose={() => {
              setShowSendModal(false);
              setSelectedTreino(null);
            }}
            onSent={(payload) => handleSendTreino(payload)}
          />
        )}
      </div>
    </div>
  );
}
