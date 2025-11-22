// src/pages/Admin/Professores.jsx
import React, { useState, useEffect } from "react";
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

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  const [professores, setProfessores] = useState([]);

  // =========== BUSCAR PROFESSORES ===========
  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/professor/crud/listar`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Erro ao buscar professores");

        const data = await res.json();

        setProfessores(data.sort((a, b) => (a.fu_id || 0) - (b.fu_id || 0)));
      } catch (err) {
        console.error("Erro ao carregar professores:", err);
      }
    };

    fetchProfessores();
  }, []);

  // =========== CRIAR PROFESSOR ===========
  const handleAddProfessor = async (novo) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/professor/crud/criar`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novo),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const created = data.professor || data;

      setProfessores((prev) => [created, ...prev]);
      setShowAddModal(false);
    } catch (err) {
      console.error("Erro ao criar professor:", err);
      alert("Erro ao criar professor.");
    }
  };

  // =========== EDITAR PROFESSOR ===========
  const handleUpdateProfessor = async (edited) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/professor/crud/editar/${edited.fu_id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(edited),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const updated = data.professor || edited;

      setProfessores((prev) =>
        prev.map((p) => (p.fu_id === updated.fu_id ? updated : p))
      );

      setShowEditModal(false);
    } catch (err) {
      console.error("Erro ao atualizar professor:", err);
      alert("Erro ao atualizar professor.");
    }
  };

  // =========== DELETAR PROFESSOR ===========
  const handleDeleteProfessor = async (prof) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/professor/crud/deletar/${prof.fu_id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message);

      setProfessores((prev) => prev.filter((p) => p.fu_id !== prof.fu_id));

      setShowDeleteModal(false);
    } catch (err) {
      console.error("Erro ao excluir professor:", err);
      alert("Erro ao excluir professor.");
    }
  };

  // =========== FILTRO ===========
  const professoresFiltrados = professores.filter((p) => {
    const termo = searchTerm.toLowerCase();
    return (
      (p.fu_nome || "").toLowerCase().includes(termo) ||
      (p.fu_email || "").toLowerCase().includes(termo) ||
      String(p.fu_cpf || "").includes(termo)
    );
  });

  // ========= PAGINAÇÃO ==========
  const totalPages = Math.max(
    1,
    Math.ceil(professoresFiltrados.length / itemsPerPage)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const professoresPaginados = professoresFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };

  return (
    <div className="admin-modal tabela-page">
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

      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {professoresPaginados.length > 0 ? (
            professoresPaginados.map((p) => (
              <tr key={p.fu_id}>
                <td>{p.fu_id}</td>

                <td className="user-info">
                  <div className="icone">
                    {(p.fu_nome || "")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  {p.fu_nome}
                </td>

                <td>{p.fu_email}</td>
                <td>{p.fu_cpf}</td>
                <td>{p.fu_telefone}</td>

                <td>
                  <button
                    className="action-btn"
                    onClick={() => {
                      setSelectedProfessor(p);
                      setShowEditModal(true);
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  <button
                    className="action-btn"
                    onClick={() => {
                      setSelectedProfessor(p);
                      setShowDeleteModal(true);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                  <button
                    className="action-btn"
                    onClick={() => {
                      setSelectedProfessor(p);
                      setShowDetailsModal(true);
                    }}
                  >
                    <i className="bi bi-three-dots"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhum professor encontrado.</td>
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
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="page"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* MODAIS */}
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
