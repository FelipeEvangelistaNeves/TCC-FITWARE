import React, { useState } from "react";
import "../../styles/pages/admin/tabelas.scss";

import AddProfessor from "./AddProfessor";
import EditarProfessor from "./EditarProfessor";
import DetalhesProfessor from "./DetalhesProfessor";
import ExcluirProfessor from "./ExcluirProfessor";

export default function Professores() {
  const [activeTab, setActiveTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [professores, setProfessores] = useState([
    {
      id: "#PROF-102",
      nome: "Maria Souza",
      especialidade: "Treinos Funcionais",
      status: "Ativo",
      cor: "purple",
    },
    {
      id: "#PROF-103",
      nome: "Lucas Rocha",
      especialidade: "Musculação",
      status: "Ativo",
      cor: "blue",
    },
    {
      id: "#PROF-104",
      nome: "Juliana Lima",
      especialidade: "Yoga",
      status: "Inativo",
      cor: "green",
    },
  ]);

  // === Estados dos modais ===
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  // === Filtro ===
  const professoresFiltrados = professores.filter((p) => {
    const termo = searchTerm.toLowerCase();
    const correspondeBusca =
      p.nome.toLowerCase().includes(termo) ||
      p.especialidade.toLowerCase().includes(termo) ||
      p.id.toLowerCase().includes(termo);
    const correspondeAba = activeTab === "ativos" ? p.status === "Ativo" : true;
    return correspondeBusca && correspondeAba;
  });

  // === Paginação ===
  const totalPages = Math.ceil(professoresFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const professoresPaginados = professoresFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // === CRUD ===
  const handleAddProfessor = (novo) => {
    const nextId = `#PROF-${Math.floor(100 + Math.random() * 900)}`;
    setProfessores((prev) => [{ id: nextId, ...novo }, ...prev]);
    setShowAddModal(false);
  };

  const handleUpdateProfessor = (editado) => {
    setProfessores((prev) =>
      prev.map((p) => (p.id === editado.id ? editado : p))
    );
    setShowEditModal(false);
  };

  const handleDeleteProfessor = (prof) => {
    setProfessores((prev) => prev.filter((p) => p.id !== prof.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="tabela-page">
      {/* ===== HEADER ===== */}
      <div className="tabela-header">
        <h2>Gerenciar Professores</h2>
        <div className="acoes-header">
          <input
            type="text"
            placeholder="Buscar professor..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            + Adicionar Professor
          </button>
        </div>
      </div>

      {/* ===== TABS ===== */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "todos" ? "active" : ""}`}
          onClick={() => setActiveTab("todos")}>
          Todos os Professores
        </button>
        <button
          className={`tab ${activeTab === "ativos" ? "active" : ""}`}
          onClick={() => setActiveTab("ativos")}>
          Ativos
        </button>
      </div>

      {/* ===== TABELA ===== */}
      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Especialidade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {professoresPaginados.length > 0 ? (
            professoresPaginados.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td className="user-info">
                  <div className={`icone ${p.cor}`}>
                    {p.nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  {p.nome}
                </td>
                <td>{p.especialidade}</td>
                <td>
                  <span className={`status ${p.status.toLowerCase()}`}>
                    {p.status}
                  </span>
                </td>
                <td>
                  <button
                    className="action-btn"
                    title="Editar"
                    onClick={() => {
                      setSelectedProfessor(p);
                      setShowEditModal(true);
                    }}>
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="action-btn"
                    title="Excluir"
                    onClick={() => {
                      setSelectedProfessor(p);
                      setShowDeleteModal(true);
                    }}>
                    <i className="bi bi-trash"></i>
                  </button>
                  <button
                    className="action-btn"
                    title="Detalhes"
                    onClick={() => {
                      setSelectedProfessor(p);
                      setShowDetailsModal(true);
                    }}>
                    <i className="bi bi-three-dots"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="sem-resultado">
                Nenhum professor encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ===== PAGINAÇÃO ===== */}
      <div className="paginacao">
        <span>Itens por página:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>

        <div className="pages">
          <button
            className="page"
            onClick={() => handlePageChange(currentPage - 1)}>
            <i className="bi bi-chevron-left"></i>
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </button>
          ))}

          <button
            className="page"
            onClick={() => handlePageChange(currentPage + 1)}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* ===== MODAIS ===== */}
      {showAddModal && (
        <AddProfessor
          onClose={() => setShowAddModal(false)}
          onSave={handleAddProfessor}
        />
      )}

      {showEditModal && selectedProfessor && (
        <EditarProfessor
          professor={selectedProfessor}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateProfessor}
        />
      )}

      {showDetailsModal && selectedProfessor && (
        <DetalhesProfessor
          professor={selectedProfessor}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {showDeleteModal && selectedProfessor && (
        <ExcluirProfessor
          professor={selectedProfessor}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteProfessor}
        />
      )}
    </div>
  );
}
