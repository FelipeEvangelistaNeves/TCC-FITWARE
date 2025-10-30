import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/admin/tabelas.scss";

export default function Alunos() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const alunos = [
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
  ];

  // ======== FILTRO DE BUSCA E ABA ========
  const alunosFiltrados = alunos.filter((a) => {
    const termo = searchTerm.toLowerCase();
    const correspondeBusca =
      a.nome.toLowerCase().includes(termo) ||
      a.turma.toLowerCase().includes(termo) ||
      a.id.toLowerCase().includes(termo);

    const correspondeAba = activeTab === "ativos" ? a.status === "Ativo" : true;

    return correspondeBusca && correspondeAba;
  });

  // ======== PAGINAÇÃO ========
  const totalPages = Math.ceil(alunosFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const alunosPaginados = alunosFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // ======== EXCLUIR ========
  const handleDelete = (aluno) => {
    if (window.confirm(`Tem certeza que deseja excluir ${aluno.nome}?`)) {
      alert(`Aluno ${aluno.nome} removido com sucesso!`);
    }
  };

  return (
    <div className="tabela-page">
      {/* ===== Header ===== */}
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
          <button className="add-btn" onClick={() => navigate("add")}>
            + Adicionar Aluno
          </button>
        </div>
      </div>

      {/* ===== Tabs ===== */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "todos" ? "active" : ""}`}
          onClick={() => setActiveTab("todos")}
        >
          Todos os Alunos
        </button>
        <button
          className={`tab ${activeTab === "ativos" ? "active" : ""}`}
          onClick={() => setActiveTab("ativos")}
        >
          Ativos
        </button>
      </div>

      {/* ===== Tabela ===== */}
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
            alunosPaginados.map((a, i) => (
              <tr key={i}>
                <td>{a.id}</td>
                <td className="user-info">
                  <div className={`icone ${a.cor}`}>
                    {a.nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
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
                  {/* Editar */}
                  <button
                    className="action-btn"
                    title="Editar Aluno"
                    onClick={() =>
                      navigate(
                        `editar/${encodeURIComponent(a.id.replace("#", ""))}`
                      )
                    }
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  {/* Excluir */}
                  <button
                    className="action-btn"
                    title="Excluir Aluno"
                    onClick={() => handleDelete(a)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                  {/* Detalhes */}
                  <button
                    className="action-btn"
                    title="Ver Detalhes"
                    onClick={() =>
                      navigate(
                        `detalhes/${encodeURIComponent(a.id.replace("#", ""))}`
                      )
                    }
                  >
                    <i className="bi bi-three-dots"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="sem-resultado">
                Nenhum aluno encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ===== Paginação ===== */}
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
    </div>
  );
}
