import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/admin/tabelas.scss";

export default function Financeiro() {
  const [abaAtiva, setAbaAtiva] = useState("todos");
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);

  const navigate = useNavigate();

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

  // ====== FILTRO DE BUSCA E ABA ======
  const pagamentosFiltrados = pagamentos.filter((p) => {
    const termo = busca.toLowerCase();
    const correspondeBusca =
      p.usuario.toLowerCase().includes(termo) ||
      p.id.toLowerCase().includes(termo) ||
      p.status.toLowerCase().includes(termo);
    const correspondeAba =
      abaAtiva === "pendentes" ? p.status === "Pendente" : true;
    return correspondeBusca && correspondeAba;
  });

  // ====== PAGINAÇÃO ======
  const totalPaginas = Math.ceil(pagamentosFiltrados.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const pagamentosPaginados = pagamentosFiltrados.slice(inicio, fim);

  const mudarPagina = (novaPagina) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
      setPaginaAtual(novaPagina);
    }
  };

  const mudarItensPorPagina = (valor) => {
    setItensPorPagina(Number(valor));
    setPaginaAtual(1); // resetar para primeira página
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
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPaginaAtual(1);
            }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${abaAtiva === "todos" ? "active" : ""}`}
          onClick={() => {
            setAbaAtiva("todos");
            setPaginaAtual(1);
          }}
        >
          Todos os Pagamentos
        </button>
        <button
          className={`tab ${abaAtiva === "pendentes" ? "active" : ""}`}
          onClick={() => {
            setAbaAtiva("pendentes");
            setPaginaAtual(1);
          }}
        >
          Pendentes
        </button>
      </div>

      {/* Tabela */}
      <table className="tabela">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Usuário</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pagamentosPaginados.length > 0 ? (
            pagamentosPaginados.map((p, index) => (
              <tr key={p.id}>
                <td>{inicio + index + 1}</td>
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
                  <button
                    className="action-btn"
                    title="Gerar Recibo"
                    onClick={() => alert(`Gerando recibo para ${p.usuario}...`)}
                  >
                    <i className="bi bi-receipt"></i>
                  </button>

                  <button
                    className="action-btn"
                    title="Ver Detalhes"
                    onClick={() =>
                      navigate(
                        `detalhes/${encodeURIComponent(p.id.replace(/^#/, ""))}`
                      )
                    }
                  >
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", color: "#aaa" }}>
                Nenhum pagamento encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginação */}
      {totalPaginas > 1 && (
        <div className="paginacao">
          <span>Itens por página:</span>
          <select
            value={itensPorPagina}
            onChange={(e) => mudarItensPorPagina(e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>

          <div className="pages">
            <button
              className="page"
              onClick={() => mudarPagina(paginaAtual - 1)}
              disabled={paginaAtual === 1}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {[...Array(totalPaginas)].map((_, i) => (
              <button
                key={i}
                className={`page ${paginaAtual === i + 1 ? "active" : ""}`}
                onClick={() => mudarPagina(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="page"
              onClick={() => mudarPagina(paginaAtual + 1)}
              disabled={paginaAtual === totalPaginas}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
