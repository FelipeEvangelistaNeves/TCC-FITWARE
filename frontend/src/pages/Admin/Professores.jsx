import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/admin/tabelas.scss";

export default function Professores() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const professores = [
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
  ];

  // ======== FILTRO ========
  const professoresFiltrados = professores.filter((p) => {
    const termo = searchTerm.toLowerCase();
    const correspondeBusca =
      p.nome.toLowerCase().includes(termo) ||
      p.especialidade.toLowerCase().includes(termo) ||
      p.id.toLowerCase().includes(termo);

    const correspondeAba = activeTab === "ativos" ? p.status === "Ativo" : true;

    return correspondeBusca && correspondeAba;
  });

  // ======== PAGINAÇÃO ========
  const totalPages = Math.ceil(professoresFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const professoresPaginados = professoresFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleDelete = (prof) => {
    if (window.confirm(`Deseja realmente excluir ${prof.nome}?`)) {
      alert(`Professor ${prof.nome} excluído com sucesso!`);
    }
  };

  return (
    <div className="tabela-page">
      {/* ===== Header ===== */}
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
          <button className="add-btn" onClick={() => navigate("add")}>
            + Adicionar Professor
          </button>
        </div>
      </div>

      {/* ===== Tabs ===== */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "todos" ? "active" : ""}`}
          onClick={() => setActiveTab("todos")}
        >
          Todos os Professores
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
            <th>Especialidade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {professoresPaginados.length > 0 ? (
            professoresPaginados.map((p, i) => (
              <tr key={i}>
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
                  {/* Editar */}
                  <button
                    className="action-btn"
                    title="Editar Professor"
                    onClick={() =>
                      navigate(
                        `editar/${encodeURIComponent(p.id.replace("#", ""))}`
                      )
                    }
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  {/* Excluir */}
                  <button
                    className="action-btn"
                    title="Excluir Professor"
                    onClick={() => handleDelete(p)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                  {/* Detalhes */}
                  <button
                    className="action-btn"
                    title="Ver Detalhes"
                    onClick={() =>
                      navigate(
                        `detalhes/${encodeURIComponent(p.id.replace("#", ""))}`
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
                Nenhum professor encontrado.
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
