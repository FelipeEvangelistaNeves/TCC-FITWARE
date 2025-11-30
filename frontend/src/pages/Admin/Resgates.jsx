import React, { useState, useEffect } from "react";
import "../../styles/pages/admin/tabelas.scss";

export default function Resgates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [resgates, setResgates] = useState([]);

  // Modal info status
  const [showStatusInfo, setShowStatusInfo] = useState(false);

  // Buscar resgates
  useEffect(() => {
    const fetchResgates = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/resgates/crud/listar`,
          { method: "GET", credentials: "include" }
        );

        if (!res.ok) throw new Error("Erro ao buscar resgates");

        const data = await res.json();
        setResgates(
          data.resgates.sort((a, b) => (a.re_id || 0) - (b.re_id || 0))
        );
      } catch (err) {
        console.error("Erro ao carregar resgates:", err);
      }
    };

    fetchResgates();
  }, []);

  const handleDeleteResgate = async (r) => {
    if (!window.confirm(`Excluir resgate #${r.re_id}?`)) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/resgates/crud/deletar/${r.re_id}`,
        { method: "DELETE", credentials: "include" }
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Erro ao excluir");

      setResgates((prev) => prev.filter((x) => x.re_id !== r.re_id));
    } catch (err) {
      console.error("Erro ao excluir resgate:", err);
      alert("Erro ao excluir resgate.");
    }
  };

  // Filtro
  const resgatesFiltrados = resgates.filter((r) => {
    const termo = searchTerm.toLowerCase();
    return (
      String(r.re_id || "").includes(termo) ||
      String(r.al_id || "").includes(termo) ||
      String(r.pd_id || "").includes(termo) ||
      (r.re_hash || "").toLowerCase().includes(termo) ||
      String(r.re_preco || "").includes(termo) ||
      ((r.re_data || "").toLowerCase().includes &&
        String(r.re_data || "")
          .toLowerCase()
          .includes(termo)) ||
      String(r.re_status || "")
        .toLowerCase()
        .includes(termo)
    );
  });

  // Paginação
  const totalPages = Math.max(
    1,
    Math.ceil(resgatesFiltrados.length / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const resgatesPaginados = resgatesFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };

  const fmtDate = (d) => {
    if (!d) return "";
    try {
      const dt = new Date(d);
      return dt.toLocaleString();
    } catch {
      return String(d);
    }
  };

  // Modal de informações sobre status
  const StatusInfoModal = () => (
    <div className="modal-overlay" onClick={() => setShowStatusInfo(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Informações sobre o Status do Resgate</h3>

        <div className="form-card">
          <p>
            <strong>● Resgatado</strong>: O aluno realizou o resgate
            digitalmente, mas ainda não recebeu o brinde.
          </p>

          <p>
            <strong>● Entregue</strong>: O brinde já foi entregue fisicamente ao
            aluno.
          </p>
        </div>

        <div className="modal-actions">
          <button
            className="btn-cancelar"
            onClick={() => setShowStatusInfo(false)}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-modal tabela-page">
      {showStatusInfo && <StatusInfoModal />}

      <div className="tabela-header">
        <h2>Resgates</h2>

        <div className="acoes-header">
          <input
            type="text"
            placeholder="Buscar resgate..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="tabela">
        <thead>
          <tr>
            <th>Nome do Aluno</th>
            <th>Nome do Produto</th>
            <th>Hash</th>
            <th>Preço</th>
            <th>Data</th>

            <th>
              Status
              <button
                className="info-btn"
                onClick={() => setShowStatusInfo(true)}
                style={{ marginLeft: "6px" }}
              >
                <i className="bi bi-info-circle"></i>
              </button>
            </th>

            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {resgatesPaginados.length > 0 ? (
            resgatesPaginados.map((r) => (
              <tr key={r.id}>
                <td>{r.alunoNome?.al_nome}</td>
                <td>{r.produtoNome?.pd_nome}</td>
                <td className="user-info">{r.hash}</td>
                <td>{r.preco}</td>
                <td>{fmtDate(r.data)}</td>
                <td>{r.status}</td>

                <td>
                  <button
                    className="action-btn"
                    onClick={() => handleDeleteResgate(r)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Nenhum resgate encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINAÇÃO */}
      <div className="paginacao">
        <span>Itens por página:</span>

        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>

        <div className="pages">
          <button
            className="page"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="page"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
