import React from "react";
import "../../styles/pages/admin/notificacoes.scss";

export default function Notificacao() {
  const notifications = [
    {
      id: 1,
      user: "Maria Silva",
      action: "completou o treino de força",
      time: "Hoje, 14:30",
      color: "bg-primary",
      initials: "MS",
    },
    {
      id: 2,
      user: "Pedro Alves",
      action: "resgatou pontos por uma consulta",
      time: "Hoje, 12:15",
      color: "bg-success",
      initials: "PA",
    },
    {
      id: 3,
      user: "Carlos Mendes",
      action: "iniciou o desafio de 7 dias",
      time: "Ontem, 18:45",
      color: "bg-warning",
      initials: "CM",
    },
    {
      id: 4,
      user: "Ana Santos",
      action: "completou o desafio de nutrição",
      time: "Ontem, 10:20",
      color: "bg-danger",
      initials: "AS",
    },
  ];

  return (
    <div className="notifications-page container-fluid">
      <h2 className="page-title mb-4">Notificações</h2>

      <div className="card notifications-card">
        <ul className="list-group list-group-flush">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="list-group-item d-flex align-items-center"
            >
              <div className={`avatar ${n.color} me-3`}>
                <span>{n.initials}</span>
              </div>
              <div className="flex-grow-1">
                <p className="mb-0">
                  <strong>{n.user}</strong> {n.action}
                </p>
                <small className="text-muted">{n.time}</small>
              </div>
              <button className="btn btn-sm btn-outline-light">
                <i className="bi bi-eye"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
