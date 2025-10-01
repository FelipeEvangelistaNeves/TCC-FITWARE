import React, { useState } from "react";
import "../../styles/pages/admin/tabelas.scss";

export default function Treinos() {
  const [activeTab, setActiveTab] = useState("todos");

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
    },
  ];

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
          />
          <button className="add-btn">+ Criar Treino</button>
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
        <button
          className={`tab ${activeTab === "populares" ? "active" : ""}`}
          onClick={() => setActiveTab("populares")}
        >
          Populares
        </button>
      </div>

      {/* ===== Tabela ===== */}
      <table className="tabela">
        <thead>
          <tr>
            <th></th>
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
          {treinos.map((t) => (
            <tr key={t.id}>
              <td>
                <input type="checkbox" />
              </td>
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
                <button className="action-btn">
                  <i className="bi bi-play"></i>
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
        <span>Itens por página:</span>
        <select>
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>

        <div className="pages">
          <button className="page active">1</button>
          <button className="page">2</button>
          <button className="page">3</button>
          <button className="page">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
