import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/admin/tabelas.scss";

export default function Treinos() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const treinos = [
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
    {
      id: 4,
      nome: "Treino de Flexibilidade",
      descricao: "Alongamentos e mobilidade",
      tipo: "Flexibilidade",
      duracao: "25 min",
      nivel: "Iniciante",
      nivelClass: "iniciante",
      exercicios: 10,
      atribuido: 42,
      icone: "bi-arrows-move",
      cor: "green",
      data: "2025-10-28",
    },
  ];

  // ====== FILTROS ======
  const filteredTreinos = treinos.filter((t) => {
    const nomeMatch = t.nome.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === "recentes") {
      const dataTreino = new Date(t.data);
      const agora = new Date();
      const diffDias = (agora - dataTreino) / (1000 * 60 * 60 * 24);
      return nomeMatch && diffDias <= 7; // últimos 7 dias
    }
    return nomeMatch;
  });

  // ====== PAGINAÇÃO ======
  const totalPages = Math.ceil(filteredTreinos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const treinosExibidos = filteredTreinos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="tabela-page">
      {/* ===== Header ===== */}
      <div className="tabela-header">
        <h2>Enviar Treinos</h2>
        <div className="acoes-header">
          <input
            type="text"
            placeholder="Buscar treino..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-btn" onClick={() => navigate("addtreinos")}>
            + Criar Treino
          </button>
        </div>
      </div>

      {/* ===== Tabs ===== */}
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

      {/* ===== Tabela ===== */}
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
          {treinosExibidos.map((t) => (
            <tr key={t.id}>
              <td className="nome-treino d-flex flex-row align-center gap-10">
                <div className={`icone ${t.cor}`}>
                  <i className={`bi ${t.icone}`}></i>
                </div>
                <div className="d-flex flex-column">
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
                <button
                  className="action-btn"
                  onClick={() => navigate("enviartreino")}
                  title="Enviar Treino"
                >
                  <i className="bi bi-play"></i>
                </button>
                <button
                  className="action-btn"
                  onClick={() => navigate("detalhestreino")}
                  title="Detalhes do Treino"
                >
                  <i className="bi bi-three-dots-vertical"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== Paginação ===== */}
      <div className="paginacao">
        <span>Itens por página:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

        <div className="pages">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`page ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              className="page"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
