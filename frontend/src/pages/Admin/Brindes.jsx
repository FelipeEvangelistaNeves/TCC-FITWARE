import React, { useState } from "react";
import "../../styles/pages/admin/tabelas.scss";
import AddBrinde from "./AddBrindes";
import EditarBrinde from "./EditarBrinde";
import DetalhesBrinde from "./DetalhesBrindes";

export default function Brindes() {
  const [activeTab, setActiveTab] = useState("todos");
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [itensPorPagina] = useState(10);

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

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtrados = brindes.filter((b) => {
    const termo = busca.toLowerCase();
    const correspondeBusca = b.nome.toLowerCase().includes(termo);
    const correspondeAba = activeTab === "ativos" ? b.status === "ativo" : true;
    return correspondeBusca && correspondeAba;
  });

  const totalPaginas = Math.ceil(filtrados.length / itensPorPagina);
  const inicio = (pagina - 1) * itensPorPagina;
  const paginados = filtrados.slice(inicio, inicio + itensPorPagina);

  const trocarPagina = (p) => p >= 1 && p <= totalPaginas && setPagina(p);

  const handleAdd = (novo) => {
    setBrindes((prev) => [
      { id: `BR-${Math.floor(Math.random() * 9000) + 1000}`, ...novo },
      ...prev,
    ]);
    setShowAdd(false);
  };

  const handleUpdate = (editado) => {
    setBrindes((prev) => prev.map((b) => (b.id === editado.id ? editado : b)));
    setShowEdit(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir este brinde?")) {
      setBrindes((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="admin-modal">
      <div className="tabela-page">
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
            <button className="add-btn" onClick={() => setShowAdd(true)}>
              + Criar Brinde
            </button>
          </div>
        </div>

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

        <table className="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Pontos</th>
              <th>Estoque</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginados.length > 0 ? (
              paginados.map((b) => (
                <tr key={b.id}>
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
                    <button
                      className="action-btn"
                      onClick={() => {
                        setSelected(b);
                        setShowEdit(true);
                      }}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleDelete(b.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => {
                        setSelected(b);
                        setShowDetails(true);
                      }}
                    >
                      <i className="bi bi-three-dots"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="sem-resultado">
                  Nenhum brinde encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="paginacao">
          <div className="pages">
            <button
              className="page"
              onClick={() => trocarPagina(pagina - 1)}
              disabled={pagina === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPaginas }, (_, i) => (
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

        {/* === MODAIS === */}
        {showAdd && (
          <AddBrinde onClose={() => setShowAdd(false)} onSave={handleAdd} />
        )}
        {showEdit && selected && (
          <EditarBrinde
            brinde={selected}
            onClose={() => setShowEdit(false)}
            onSave={handleUpdate}
          />
        )}
        {showDetails && selected && (
          <DetalhesBrinde
            brinde={selected}
            onClose={() => setShowDetails(false)}
          />
        )}
      </div>
    </div>
  );
}
