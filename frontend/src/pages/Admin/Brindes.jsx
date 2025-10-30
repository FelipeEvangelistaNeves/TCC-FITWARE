import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/admin/tabelas.scss";

export default function Brindes() {
  const [activeTab, setActiveTab] = useState("todos");
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [brindes, setBrindes] = useState([
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
  ]);

  const navigate = useNavigate();
  const itensPorPagina = 10;

  // ====== FILTRO DE BUSCA E ABA ======
  const filtrados = brindes.filter((b) => {
    const termo = busca.toLowerCase();
    const correspondeBusca = b.nome.toLowerCase().includes(termo);
    const correspondeAba = activeTab === "ativos" ? b.status === "ativo" : true;
    return correspondeBusca && correspondeAba;
  });

  // ====== PAGINAÇÃO ======
  const totalPaginas = Math.ceil(filtrados.length / itensPorPagina);
  const inicio = (pagina - 1) * itensPorPagina;
  const brindesPaginados = filtrados.slice(inicio, inicio + itensPorPagina);

  const trocarPagina = (novaPagina) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) setPagina(novaPagina);
  };

  // ====== EXCLUIR BRINDE ======
  const excluirBrinde = (id) => {
    const confirmar = window.confirm("Deseja realmente excluir este brinde?");
    if (confirmar) setBrindes(brindes.filter((b) => b.id !== id));
  };

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
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button className="add-btn" onClick={() => navigate("criar")}>
            + Criar Brinde
          </button>
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
            <th>Nome do Brinde</th>
            <th>Pontos</th>
            <th>Estoque</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {brindesPaginados.length > 0 ? (
            brindesPaginados.map((b, i) => (
              <tr key={i}>
                <td>{b.nome}</td>
                <td>
                  <span style={{ color: "#dbac0d", fontWeight: "600" }}>
                    ⭐ {b.pontos}
                  </span>
                </td>
                <td>{b.estoque}</td>
                <td>
                  <span
                    className={`status ${
                      b.status === "ativo" ? "pago" : "cancelado"
                    }`}
                  >
                    {b.status === "ativo" ? "Ativo" : "Esgotado"}
                  </span>
                </td>
                <td>
                  {/* Editar */}
                  <button
                    className="action-btn"
                    title="Editar"
                    onClick={() =>
                      navigate(`editar/${encodeURIComponent(b.id)}`)
                    }
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  {/* Excluir */}
                  <button
                    className="action-btn"
                    title="Excluir"
                    onClick={() => excluirBrinde(b.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                  {/* Detalhes */}
                  <button
                    className="action-btn"
                    title="Detalhes"
                    onClick={() =>
                      navigate(`detalhes/${encodeURIComponent(b.id)}`)
                    }
                  >
                    <i className="bi bi-three-dots"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", color: "#aaa" }}>
                Nenhum brinde encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ===== Paginação ===== */}
      <div className="paginacao">
        <div>
          Itens por página:
          <select value={itensPorPagina} disabled>
            <option>{itensPorPagina}</option>
          </select>
        </div>
        <div className="pages">
          <button
            className="page"
            onClick={() => trocarPagina(pagina - 1)}
            disabled={pagina === 1}
          >
            &lt;
          </button>
          {[...Array(totalPaginas)].map((_, i) => (
            <button
              key={i}
              className={`page ${pagina === i + 1 ? "active" : ""}`}
              onClick={() => trocarPagina(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="page"
            onClick={() => trocarPagina(pagina + 1)}
            disabled={pagina === totalPaginas}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
