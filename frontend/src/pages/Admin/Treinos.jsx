import React, { useState } from "react";
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

  // ==== LISTA DE TREINOS ====
  const [treinos, setTreinos] = useState([
    {
      id: 1,
      nome: "Treino de Força",
      descricao: "Foco em membros superiores",
      tipo: "Força",
      duracao: "45 min",
      nivel: "Intermediário",
      nivelClass: "intermediario",
      exercicios: 6,
      atribuido: 24,
      icone: "bi-lightning-charge",
      cor: "purple",
      data: "2025-10-25",
    },
    {
      id: 2,
      nome: "Treino de Cardio",
      descricao: "Corrida e exercícios aeróbicos",
      tipo: "Cardio",
      duracao: "30 min",
      nivel: "Iniciante",
      nivelClass: "iniciante",
      exercicios: 3,
      atribuido: 36,
      icone: "bi-heart-pulse",
      cor: "blue",
      data: "2025-10-27",
    },
    {
      id: 3,
      nome: "Treino Funcional",
      descricao: "Circuito de alta intensidade",
      tipo: "Funcional",
      duracao: "40 min",
      nivel: "Avançado",
      nivelClass: "avancado",
      exercicios: 8,
      atribuido: 18,
      icone: "bi-fire",
      cor: "orange",
      data: "2025-10-20",
    },
  ]);

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
  const handleAddTreino = (novo) => {
    const novoTreino = {
      ...novo,
      id: Date.now(),
      cor: "purple",
      icone: "bi-lightning-charge",
      nivelClass:
        novo.nivel === "Iniciante"
          ? "iniciante"
          : novo.nivel === "Intermediário"
          ? "intermediario"
          : "avancado",
      exercicios: novo.exercicios?.length || 0,
      atribuido: 0,
      data: new Date().toISOString().split("T")[0],
    };
    setTreinos((prev) => [novoTreino, ...prev]);
    setShowAddModal(false);
    setCurrentPage(1);
  };

  const handleUpdateTreino = (editado) => {
    setTreinos((prev) => prev.map((t) => (t.id === editado.id ? editado : t)));
    setShowEditModal(false);
  };

  const handleDeleteTreino = (id) => {
    setTreinos((prev) => prev.filter((t) => t.id !== id));
    setShowDeleteModal(false);
  };

  const handleSendTreino = (payload) => {
    // payload = { treinoId, treinoNome, alunos: [...], mensagem }
    console.log("EnviarTreino payload:", payload);
    alert(
      `Treino "${payload.treinoNome}" enviado para ${payload.alunos.length} aluno(s).`
    );
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

        {/* TABS */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === "todos" ? "active" : ""}`}
            onClick={() => setActiveTab("todos")}
          >
            Todos os Treinos
          </button>
          <button
            className={`tab ${activeTab === "recentes" ? "active" : ""}`}
            onClick={() => setActiveTab("recentes")}
          >
            Recentes
          </button>
        </div>

        {/* TABELA */}
        <table className="tabela">
          <thead>
            <tr>
              <th>Nome do Treino</th>
              <th>Tipo</th>
              <th>Duração</th>
              <th>Nível</th>
              <th>Exercícios</th>
              <th>Atribuído</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {treinosExibidos.length > 0 ? (
              treinosExibidos.map((t) => (
                <tr key={t.id}>
                  <td className="nome-treino">
                    <div className={`icone ${t.cor}`}>
                      <i className={`bi ${t.icone}`}></i>
                    </div>
                    <div>
                      <strong>{t.nome}</strong>
                      <small>{t.descricao}</small>
                    </div>
                  </td>
                  <td>{t.tipo}</td>
                  <td>{t.duracao}</td>
                  <td>
                    <span className={`nivel ${t.nivelClass}`}>{t.nivel}</span>
                  </td>
                  <td>{t.exercicios}</td>
                  <td>{t.atribuido}</td>
                  <td>
                    {/* Enviar (novo ícone) */}

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
                <td colSpan="7" className="sem-resultado">
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
            onSave={(novo) => handleAddTreino(novo)}
          />
        )}

        {showEditModal && selectedTreino && (
          <EditTreinoModal
            treino={selectedTreino}
            onClose={() => setShowEditModal(false)}
            onSave={(editado) => handleUpdateTreino(editado)}
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
            onConfirm={() => handleDeleteTreino(selectedTreino.id)}
          />
        )}

        {showSendModal && selectedTreino && (
          <EnviarTreinoModal
            treino={selectedTreino}
            onClose={() => {
              setShowSendModal(false);
              setSelectedTreino(null);
            }}
            onSend={(payload) => handleSendTreino(payload)}
          />
        )}
      </div>
    </div>
  );
}
