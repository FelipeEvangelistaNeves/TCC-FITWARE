import React, { useState } from "react";
import "../../styles/pages/admin/tabelas.scss";

export default function Brindes() {
  const [activeTab, setActiveTab] = useState("todos");

  const brindes = [
    {
      id: "BR-2305",
      nome: "Camiseta FitWare",
      pontos: 500,
      estoque: 45,
      status: "ativo",
    },
    {
      id: "BR-2304",
      nome: "Garrafa FitWare",
      pontos: 1000,
      estoque: 15,
      status: "ativo",
    },
    {
      id: "BR-2303",
      nome: "Treino Personalizado",
      pontos: 2000,
      estoque: 25,
      status: "esgotado",
    },
  ];

  return (
    <div className="tabela-page">
      {/* ===== Header ===== */}
      <div className="tabela-header">
        <h2>Gerenciar Brindes</h2>
        <div className="acoes-header">
          <input
            type="text"
            placeholder="Buscar Brinde..."
            className="search-input"
          />
          <button className="add-btn">+ Criar Brinde</button>
        </div>
      </div>

      {/* ===== Tabs ===== */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "todos" ? "active" : ""}`}
          onClick={() => setActiveTab("todos")}
        >
          Todos os Brindes
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
            <th></th>
            <th>Nome do Brinde</th>
            <th>Pontos</th>
            <th>Estoque</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {brindes
            .filter((brinde) =>
              activeTab === "ativos" ? brinde.status === "ativo" : true
            )
            .map((brinde, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{brinde.nome}</td>
                <td>
                  <span style={{ color: "#dbac0d", fontWeight: "600" }}>
                    ⭐ {brinde.pontos}
                  </span>
                </td>
                <td>{brinde.estoque}</td>
                <td>
                  <span
                    className={`status ${
                      brinde.status === "ativo" ? "pago" : "cancelado"
                    }`}
                  >
                    {brinde.status === "ativo" ? "Ativo" : "Esgotado"}
                  </span>
                </td>
                <td>
                  <button className="action-btn">
                    <i className="bi bi-list-ul"></i>
                  </button>
                  <button className="action-btn">
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* ===== Paginação ===== */}
      <div className="paginacao">
        <div>
          Itens por página:
          <select>
            <option>10</option>
            <option>20</option>
            <option>30</option>
          </select>
        </div>
        <div className="pages">
          <button className="page active">1</button>
          <button className="page">2</button>
          <button className="page">3</button>
          <button className="page">&gt;</button>
        </div>
      </div>
    </div>
  );
}
