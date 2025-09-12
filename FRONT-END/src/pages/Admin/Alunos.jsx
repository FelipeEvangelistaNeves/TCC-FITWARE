import React from "react";
import "../../styles/pages/admin/users.scss";

export default function Alunos() {
  const alunos = [
    {
      id: "#AL-2305",
      nome: "Maria Silva",
      turma: "Funcional",
      status: "Ativo",
      avatar: "MS",
      cor: "blue",
    },
    {
      id: "#AL-2304",
      nome: "Pedro Alves",
      turma: "Cardio",
      status: "Ativo",
      avatar: "PA",
      cor: "green",
    },
    {
      id: "#AL-2303",
      nome: "Carlos Mendes",
      turma: "Força",
      status: "Inativo",
      avatar: "CM",
      cor: "orange",
    },
    {
      id: "#AL-2302",
      nome: "Ana Santos",
      turma: "Yoga",
      status: "Ativo",
      avatar: "AS",
      cor: "red",
    },
  ];

  return (
    <div className="usuarios-page">
      <div className="usuarios-header">
        <h2>Gerenciar Alunos</h2>
        <div className="acoes-header">
          <input
            type="text"
            placeholder="Buscar aluno..."
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
            <th>Turma</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((a, i) => (
            <tr key={i}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{a.id}</td>
              <td className="user-info">
                <div className={`avatar ${a.cor}`}>{a.avatar}</div>
                {a.nome}
              </td>
              <td>{a.turma}</td>
              <td>
                <span className={`status ${a.status.toLowerCase()}`}>
                  {a.status}
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
