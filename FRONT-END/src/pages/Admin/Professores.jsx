import React from "react";
import "../../styles/pages/admin/users.scss";

export default function Professores() {
  const professores = [
    {
      id: "#PROF-102",
      nome: "Maria Souza",
      especialidade: "Treinos Funcionais",
      status: "Ativo",
      avatar: "MS",
      cor: "purple",
    },
    {
      id: "#PROF-103",
      nome: "Lucas Rocha",
      especialidade: "Musculação",
      status: "Ativo",
      avatar: "LR",
      cor: "blue",
    },
    {
      id: "#PROF-104",
      nome: "Juliana Lima",
      especialidade: "Yoga",
      status: "Inativo",
      avatar: "JL",
      cor: "green",
    },
  ];

  return (
    <div className="usuarios-page">
      <div className="usuarios-header">
        <h2>Gerenciar Professores</h2>
        <div className="acoes-header">
          <input
            type="text"
            placeholder="Buscar professor..."
            className="search-input"
          />
          <button className="btn-add">+ Adicionar</button>
        </div>
      </div>

      <table className="usuarios-table">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Nome</th>
            <th>Especialidade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {professores.map((p, i) => (
            <tr key={i}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{p.id}</td>
              <td className="user-info">
                <div className={`avatar ${p.cor}`}>{p.avatar}</div>
                {p.nome}
              </td>
              <td>{p.especialidade}</td>
              <td>
                <span className={`status ${p.status.toLowerCase()}`}>
                  {p.status}
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
    </div>
  );
}
