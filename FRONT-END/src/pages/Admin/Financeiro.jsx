import React, { useState } from "react";
import "../../styles/pages/admin/tabelas.scss";
export default function Financeiro() {
  const [abaAtiva, setAbaAtiva] = useState("todos");

  const pagamentos = [
    {
      id: "#PAY-2305",
      usuario: "Maria Silva",
      iniciais: "MS",
      cor: "blue",
      valor: "R$ 149,90",
      data: "15/05/2023",
      status: "Pago",
    },
    {
      id: "#PAY-2304",
      usuario: "Pedro Alves",
      iniciais: "PA",
      cor: "green",
      valor: "R$ 990,00",
      data: "10/05/2023",
      status: "Pago",
    },
    {
      id: "#PAY-2303",
      usuario: "Carlos Mendes",
      iniciais: "CM",
      cor: "orange",
      valor: "R$ 149,90",
      data: "05/05/2023",
      status: "Pendente",
    },
    {
      id: "#PAY-2302",
      usuario: "Ana Santos",
      iniciais: "AS",
      cor: "red",
      valor: "R$ 99,90",
      data: "01/05/2023",
      status: "Cancelado",
    },
  ];

  const statusClasses = {
    Pago: "status pago",
    Pendente: "status pendente",
    Cancelado: "status cancelado",
  };

  return (
    <div className="tabela-page">
      {/* Header */}
      <div className="tabela-header">
        <h2>Gerenciar Pagamentos</h2>

        <div className="acoes-header">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar pagamento..."
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${abaAtiva === "todos" ? "active" : ""}`}
          onClick={() => setAbaAtiva("todos")}
        >
          Todos os Pagamentos
        </button>
        <button
          className={`tab ${abaAtiva === "pendentes" ? "active" : ""}`}
          onClick={() => setAbaAtiva("pendentes")}
        >
          Pendentes
        </button>
      </div>

      {/* Tabela */}
      <table className="tabela">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Usuário</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pagamentos
            .filter((p) =>
              abaAtiva === "pendentes" ? p.status === "Pendente" : true
            )
            .map((p) => (
              <tr key={p.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{p.id}</td>
                <td>
                  <div className="nome-treino">
                    <div className={`icone ${p.cor}`}>{p.iniciais}</div>
                    <div>{p.usuario}</div>
                  </div>
                </td>
                <td>{p.valor}</td>
                <td>{p.data}</td>
                <td>
                  <span className={statusClasses[p.status]}>{p.status}</span>
                </td>
                <td>
                  <button className="action-btn">
                    <i className="bi bi-receipt"></i>
                  </button>
                  <button className="action-btn">
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Paginação */}
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
