import React, { useState } from "react";
import "../../styles/pages/admin/tabelas.scss";

import AddAluno from "./AddAluno";
import EditarAluno from "./EditarAluno";
import DetalhesAluno from "./DetalhesAluno";
import ExcluirAluno from "./ExcluirAluno";

export default function Alunos() {
  const [activeTab, setActiveTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [alunos, setAlunos] = useState([
    {
      id: "#AL-2305",
      nome: "Maria Silva",
      turma: "Funcional",
      status: "Ativo",
      cor: "blue",
    },
    {
      id: "#AL-2304",
      nome: "Pedro Alves",
      turma: "Cardio",
      status: "Ativo",
      cor: "green",
    },
    {
      id: "#AL-2303",
      nome: "Carlos Mendes",
      turma: "Força",
      status: "Inativo",
      cor: "orange",
    },
    {
      id: "#AL-2302",
      nome: "Ana Santos",
      turma: "Yoga",
      status: "Ativo",
      cor: "red",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);

  const alunosFiltrados = alunos.filter((a) => {
    const termo = searchTerm.toLowerCase();
    const correspondeBusca =
      a.nome.toLowerCase().includes(termo) ||
      a.turma.toLowerCase().includes(termo) ||
      a.id.toLowerCase().includes(termo);
    const correspondeAba = activeTab === "ativos" ? a.status === "Ativo" : true;
    return correspondeBusca && correspondeAba;
  });

  const totalPages = Math.ceil(alunosFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const alunosPaginados = alunosFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };

  const handleAddAluno = (novo) => {
    const nextId = `#AL-${Math.floor(1000 + Math.random() * 9000)}`;
    setAlunos((prev) => [{ id: nextId, ...novo, cor: "blue" }, ...prev]);
    setShowAddModal(false);
  };

  const handleUpdateAluno = (editado) => {
    setAlunos((prev) => prev.map((a) => (a.id === editado.id ? editado : a)));
    setShowEditModal(false);
  };

  const handleDeleteAluno = (aluno) => {
    setAlunos((prev) => prev.filter((a) => a.id !== aluno.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="tabela-page">
      <div className="tabela-header">
        <h2>Gerenciar Alunos</h2>
        <div className="acoes-header">
          <input
            type="text"
            placeholder="Buscar aluno..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            + Adicionar Aluno
          </button>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "todos" ? "active" : ""}`}
          onClick={() => setActiveTab("todos")}>
          Todos os Alunos
        </button>
        <button
          className={`tab ${activeTab === "ativos" ? "active" : ""}`}
          onClick={() => setActiveTab("ativos")}>
          Ativos
        </button>
      </div>

      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Turma</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunosPaginados.length > 0 ? (
            alunosPaginados.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td className="user-info">
                  <div className={`icone ${a.cor}`}>
                    {a.nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  {a.nome}
                </td>
                <td>{a.turma}</td>
                <td>
                  <span className={`status ${a.status.toLowerCase()}`}>
                    {a.status}
                  </span>
                </td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => {
                      setSelectedAluno(a);
                      setShowEditModal(true);
                    }}>
                    <i className="bi bi-pencil"></i>
                  </button>

                  <button
                    className="action-btn"
                    onClick={() => {
                      setSelectedAluno(a);
                      setShowDeleteModal(true);
                    }}>
                    <i className="bi bi-trash"></i>
                  </button>

                  <button
                    className="action-btn"
                    onClick={() => {
                      setSelectedAluno(a);
                      setShowDetailsModal(true);
                    }}>
                    <i className="bi bi-three-dots"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhum aluno encontrado.</td>
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
          }}>
          <option value={5}>5</option>
          <option value={10}>10</option>
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

      {/* MODAIS */}
      {showAddModal && (
        <AddAluno
          onClose={() => setShowAddModal(false)}
          onSave={handleAddAluno}
        />
      )}
      {showEditModal && selectedAluno && (
        <EditarAluno
          aluno={selectedAluno}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateAluno}
        />
      )}
      {showDetailsModal && selectedAluno && (
        <DetalhesAluno
          aluno={selectedAluno}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
      {showDeleteModal && selectedAluno && (
        <ExcluirAluno
          aluno={selectedAluno}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteAluno}
        />
      )}
    </div>
  );
}
