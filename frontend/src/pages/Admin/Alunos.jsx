import React, { useState, useEffect } from "react";
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

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);

  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/admin/allAlunos`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Erro ao buscar alunos");

        const data = await res.json();

        // Ordena do menor ID → maior ID
        setAlunos(data.alunos.sort((a, b) => a.al_id - b.al_id));
      } catch (error) {
        console.error("Erro ao carregar alunos:", error);
      }
    };

    fetchAlunos();
  }, []);

  const handleAddAluno = async (novo) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/criarAluno`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novo),
        }
      );

      const data = await res.json();

      if (data.success) {
        // adiciona novo aluno à lista
        setAlunos((prev) => [data.aluno, ...prev]);
        setShowAddModal(false);
      }
    } catch (err) {
      console.error("Erro ao criar aluno:", err);
    }
  };

  const handleUpdateAluno = async (dados) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/alunos/${dados.al_id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar aluno");
      }

      // Atualiza lista local
      setAlunos((prev) =>
        prev.map((a) => (a.al_id === dados.al_id ? dados : a))
      );

      console.log("Aluno atualizado com sucesso!");
      setShowEditModal(false);
    } catch (err) {
      console.error("Erro:", err);
      alert("Não foi possível atualizar o aluno.");
    }
  };

  const handleDeleteAluno = async (aluno) => {
    try {
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/alunos/${aluno.al_id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      setAlunos((prev) => prev.filter((a) => a.al_id !== aluno.al_id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Erro ao excluir aluno:", err);
    }
  };

  const alunosFiltrados = alunos.filter((a) => {
    const termo = searchTerm.toLowerCase();
    const correspondeBusca =
      a.al_nome.toLowerCase().includes(termo) ||
      a.al_email.toLowerCase().includes(termo) ||
      String(a.al_id).includes(termo);

    const correspondeAba =
      activeTab === "Ativos" ? a.al_status === "Ativo" : true;

    return correspondeBusca && correspondeAba;
  });

  const totalPages = Math.ceil(alunosFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const alunosPaginados = alunosFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="admin-modal tabela-page">
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

      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {alunosPaginados.length > 0 ? (
            alunosPaginados.map((a) => (
              <tr key={a.al_id}>
                <td>{a.al_id}</td>

                <td className="user-info">
                  <div className="icone blue">
                    {a.al_nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  {a.al_nome}
                </td>

                <td>{a.al_email}</td>

                <td>
                  <span className={`status ${a.al_status.toLowerCase()}`}>
                    {a.al_status}
                  </span>
                </td>

                <td>
                  <button
                    className="action-btn"
                    onClick={() => {
                      setSelectedAluno(a);
                      setShowEditModal(true);
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  <button
                    className="action-btn"
                    onClick={() => {
                      setSelectedAluno(a);
                      setShowDeleteModal(true);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                  <button
                    className="action-btn"
                    onClick={() => {
                      setSelectedAluno(a);
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
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
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
              onClick={() => setCurrentPage(i + 1)}
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
