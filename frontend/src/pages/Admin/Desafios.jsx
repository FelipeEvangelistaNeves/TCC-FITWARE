import React, { useState } from "react";
import "../../styles/pages/admin/tabelas.scss";

export default function Desafios() {
  const [activeTab, setActiveTab] = useState("ativos");

  const desafios = [
    {
      id: "#DS-1001",
      nome: "Desafio 7 Dias",
      descricao: "Treinar todos os dias por uma semana",
      tipo: "Frequência",
      duracao: "7 dias",
      participantes: 42,
      pontos: 100,
      status: "ativo",
      icone: "📅",
    },
    {
      id: "#DS-1002",
      nome: "Desafio 10K",
      descricao: "Correr 10km em uma semana",
      tipo: "Cardio",
      duracao: "7 dias",
      participantes: 28,
      pontos: 150,
      status: "ativo",
      icone: "🏃",
    },
    {
      id: "#DS-1003",
      nome: "Desafio de Nutrição",
      descricao: "Seguir plano nutricional por 14 dias",
      tipo: "Nutrição",
      duracao: "14 dias",
      participantes: 35,
      pontos: 200,
      status: "ativo",
      icone: "🥗",
    },
    {
      id: "#DS-1004",
      nome: "Desafio de Força",
      descricao: "Aumentar carga em 10% em 30 dias",
      tipo: "Força",
      duracao: "30 dias",
      participantes: 18,
      pontos: 250,
      status: "pendente",
      icone: "💪",
    },
  ];

  return (
    <div className="tabela-page">
      {/* ===== Header ===== */}
      <div className="tabela-header">
        <h2>Desafios</h2>
        <div className="acoes-header">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar desafio..."
          />
          <button className="add-btn">+ Criar Desafio</button>
        </div>
      </div>

      {/* ===== Tabs ===== */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "ativos" ? "active" : ""}`}
          onClick={() => setActiveTab("ativos")}
        >
          Desafios Ativos
        </button>
        <button
          className={`tab ${activeTab === "concluidos" ? "active" : ""}`}
          onClick={() => setActiveTab("concluidos")}
        >
          Concluídos
        </button>
        <button
          className={`tab ${activeTab === "programados" ? "active" : ""}`}
          onClick={() => setActiveTab("programados")}
        >
          Programados
        </button>
      </div>

      {/* ===== Tabela ===== */}
      <table className="tabela">
        <thead>
          <tr>
            <th></th>
            <th>Nome do Desafio</th>
            <th>Tipo</th>
            <th>Duração</th>
            <th>Participantes</th>
            <th>Pontos</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {desafios.map((d) => (
            <tr key={d.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <div className="icone purple">{d.icone}</div>
                  <div>
                    <div>{d.nome}</div>
                    <small className="text-muted">{d.descricao}</small>
                  </div>
                </div>
              </td>
              <td>{d.tipo}</td>
              <td>{d.duracao}</td>
              <td>{d.participantes}</td>
              <td>
                <span className="status pontos">⭐ {d.pontos}</span>
              </td>
              <td>
                <span
                  className={`status ${
                    d.status === "ativo" ? "pago" : "pendente"
                  }`}
                >
                  {d.status === "ativo" ? "Ativo" : "Pendente"}
                </span>
              </td>
              <td>
                <button className="action-btn">
                  <i className="bi bi-pencil"></i>
                </button>
                <button className="action-btn">
                  <i className="bi bi-trash"></i>
                </button>
                <button className="action-btn">
                  <i className="bi bi-three-dots"></i>
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
            <option>50</option>
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
