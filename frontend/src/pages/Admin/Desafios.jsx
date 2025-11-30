import React, { useState, useEffect } from "react";

// ====== ESTILOS ======
import "../../styles/pages/admin/tabelas.scss";
import "../../styles/pages/admin/forms.scss";

// ====== MODAIS ======
import AddDesafio from "./AddDesafios";
import EditarDesafio from "./EditarDesafio";
import DetalhesDesafio from "./DetalhesDesafios";
import ExcluirDesafio from "./ExcluirDesafio";

export default function Desafios() {
  const [busca, setBusca] = useState("");

  // ===== PAGINAÇÃO =====
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // ===== MODAIS =====
  const [showAdd, setShowAdd] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showDetalhes, setShowDetalhes] = useState(false);
  const [showExcluir, setShowExcluir] = useState(false);
  const [selecionado, setSelecionado] = useState(null);

  // ===== DADOS =====
  const [desafios, setDesafios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // ===== FUNÇÃO PARA FORMATAR DATA =====
  const formatarData = (dataString) => {
    if (!dataString) return "-";

    try {
      const data = new Date(dataString);
      // Verifica se a data é válida
      if (isNaN(data.getTime())) return "-";

      return data.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (error) {
      return "-";
    }
  };

  // ===== FILTROS =====
  const filtrados = desafios.filter((d) => {
    const termo = busca.toLowerCase();

    const nome = String(d.de_nome || "").toLowerCase();
    const tipo = String(d.de_tag || "").toLowerCase();
    const descricao = String(d.de_descricao || "").toLowerCase();

    return (
      nome.includes(termo) || tipo.includes(termo) || descricao.includes(termo)
    );
  });

  // ===== PAGINAÇÃO =====
  const totalPages = Math.ceil(filtrados.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const exibidos = filtrados.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // ===== CRUD =====

  const adicionar = async (novo) => {
    try {
      const payload = {
        de_nome: novo.nome,
        de_descricao: novo.descricao,
        de_tag: novo.tipo,
        de_pontos: novo.pontos,
        de_status: novo.status,
        de_start: novo.inicio,
        de_end: novo.fim,
      };

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/desafios`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Falha ao criar desafio");
        return;
      }

      const data = await res.json();
      setDesafios((prev) => [data.desafio || data, ...prev]);
      setShowAdd(false);
    } catch (e) {
      console.error(e);
      alert("Erro ao criar desafio");
    }
  };

  const atualizar = async (editado) => {
    try {
      const payload = {
        de_nome: editado.de_nome,
        de_descricao: editado.de_descricao,
        de_tag: editado.de_tag,
        de_pontos: editado.de_pontos,
        de_status: editado.de_status,
        de_start: editado.de_start,
        de_end: editado.de_end,
      };

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/desafios/${editado.de_id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Falha ao atualizar desafio");
        return;
      }

      const data = await res.json();
      setDesafios((prev) =>
        prev.map((d) =>
          d.de_id === editado.de_id ? data.desafio || editado : d
        )
      );
      setShowEditar(false);
    } catch (e) {
      console.error(e);
      alert("Erro ao atualizar desafio");
    }
  };

  const deletar = async () => {
    if (!selecionado) return;
    const id = selecionado.de_id;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/desafios/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Falha ao deletar desafio");
        return;
      }

      setDesafios((prev) => prev.filter((d) => d.de_id !== id));
      setShowExcluir(false);
      setSelecionado(null);
    } catch (e) {
      console.error(e);
      alert("Erro ao deletar desafio");
    }
  };

  // ===== FETCH =====
  useEffect(() => {
    const fetchDesafios = async () => {
      try {
        setCarregando(true);

        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/desafios`, {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) throw new Error("Erro ao carregar desafios");

        const data = await res.json();
        setDesafios(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setCarregando(false);
      }
    };

    fetchDesafios();
  }, []);

  return (
    <div className="tabela-page admin-modal">
      {/* HEADER */}
      <div className="tabela-header">
        <h2>Gerenciar Desafios</h2>

        <div className="acoes-header">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar desafio..."
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setCurrentPage(1); // Reset para primeira página ao buscar
            }}
          />

          <button className="add-btn" onClick={() => setShowAdd(true)}>
            + Criar Desafio
          </button>
        </div>
      </div>

      {/* TABELA */}
      <div className="tabela-wrapper">
        <table className="tabela">
          <thead>
            <tr>
              <th>Desafio</th>
              <th>Tipo</th>
              <th>Data de Término</th>
              <th>Pontos</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {carregando ? (
              <tr>
                <td colSpan="6" className="sem-resultado">
                  Carregando...
                </td>
              </tr>
            ) : exibidos.length > 0 ? (
              exibidos.map((d) => (
                <tr key={d.de_id}>
                  <td className="user-info">
                    <div className="icone">{d.de_icone || "🎯"}</div>
                    <div>
                      <strong>{d.de_nome}</strong>
                      <br />
                      <small>{d.de_descricao}</small>
                    </div>
                  </td>

                  <td>
                    <span className="badge">{d.de_tag || "-"}</span>
                  </td>

                  <td>{formatarData(d.de_end)}</td>

                  <td>
                    <span className="pontos">⭐ {d.de_pontos || 0}</span>
                  </td>

                  <td>
                    <span
                      className={`status ${
                        String(d.de_status || "").toLowerCase() === "ativo"
                          ? "ativo"
                          : String(d.de_status || "").toLowerCase() ===
                            "concluido"
                          ? "concluido"
                          : "inativo"
                      }`}
                    >
                      {d.de_status || "Inativo"}
                    </span>
                  </td>

                  <td>
                    <button
                      className="action-btn"
                      title="Editar"
                      onClick={() => {
                        setSelecionado(d);
                        setShowEditar(true);
                      }}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

                    <button
                      className="action-btn"
                      title="Excluir"
                      onClick={() => {
                        setSelecionado(d);
                        setShowExcluir(true);
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>

                    <button
                      className="action-btn"
                      title="Detalhes"
                      onClick={() => {
                        setSelecionado(d);
                        setShowDetalhes(true);
                      }}
                    >
                      <i className="bi bi-three-dots"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="sem-resultado">
                  {busca
                    ? "Nenhum desafio encontrado com os termos buscados."
                    : "Nenhum desafio cadastrado."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINAÇÃO */}
      {!carregando && filtrados.length > 0 && (
        <div className="paginacao">
          <span>Itens por página:</span>

          <div className="paginacao-controls">
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
              <option value={50}>50</option>
            </select>
          </div>

          <div className="pages">
            <button
              className="page"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              // Mostrar apenas algumas páginas ao redor da atual
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={i}
                    className={`page ${
                      currentPage === pageNum ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                pageNum === currentPage - 2 ||
                pageNum === currentPage + 2
              ) {
                return (
                  <span key={i} className="page-ellipsis">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              className="page"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      )}

      {/* MODAIS */}
      {showAdd && (
        <AddDesafio onClose={() => setShowAdd(false)} onSave={adicionar} />
      )}

      {showEditar && selecionado && (
        <EditarDesafio
          desafio={selecionado}
          onClose={() => {
            setShowEditar(false);
            setSelecionado(null);
          }}
          onSave={atualizar}
        />
      )}

      {showDetalhes && selecionado && (
        <DetalhesDesafio
          desafio={selecionado}
          onClose={() => {
            setShowDetalhes(false);
            setSelecionado(null);
          }}
        />
      )}

      {showExcluir && selecionado && (
        <ExcluirDesafio
          desafio={selecionado}
          onClose={() => {
            setShowExcluir(false);
            setSelecionado(null);
          }}
          onConfirm={deletar}
        />
      )}
    </div>
  );
}
