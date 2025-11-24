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
  const [activeTab, setActiveTab] = useState("ativos");
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [itensPagina, setItensPagina] = useState(10);

  // ====== MODAIS ======
  const [showAdd, setShowAdd] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showDetalhes, setShowDetalhes] = useState(false);
  const [showExcluir, setShowExcluir] = useState(false);
  const [selecionado, setSelecionado] = useState(null);

  // ====== DADOS ======
  const [desafios, setDesafios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // ====== FILTROS ======
  const filtrados = desafios.filter((d) => {
    const termo = busca.toLowerCase();

    const nome = String(d.de_nome || d.nome || "").toLowerCase();
    const tipo = String(d.de_tag || d.tipo || "").toLowerCase();
    const descricao = String(d.de_descricao || d.descricao || "").toLowerCase();

    const matchBusca =
      nome.includes(termo) || tipo.includes(termo) || descricao.includes(termo);

    const status = String(d.de_status || d.status || "").toLowerCase();
    const matchAba =
      activeTab === "ativos"
        ? status === "ativo"
        : activeTab === "concluidos"
        ? status.includes("concl")
        : activeTab === "programados"
        ? status === "inativo"
        : true;

    return matchBusca && matchAba;
  });

  // ====== PAGINAÇÃO ======
  const totalPaginas = Math.ceil(filtrados.length / itensPagina);
  const inicio = (pagina - 1) * itensPagina;
  const exibidos = filtrados.slice(inicio, inicio + itensPagina);

  const mudarPagina = (p) => {
    if (p >= 1 && p <= totalPaginas) setPagina(p);
  };

  // ===== CRUD HANDLERS =====
  const adicionar = async (novo) => {
    try {
      const payload = {
        de_nome: novo.nome,
        de_descricao: novo.descricao,
        de_tag: novo.tipo,
        de_pontos: novo.pontos,
        de_status: novo.status,
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
      const novoDesafio = data.desafio || data;
      setDesafios((prev) => [novoDesafio, ...prev]);
      setShowAdd(false);
    } catch (error) {
      console.error("Erro ao criar desafio:", error);
      alert("Erro ao criar desafio");
    }
  };

  const atualizar = (editado) => {
    setDesafios((prev) =>
      prev.map((d) => {
        const idA = d.de_id || d.id;
        const idB = editado.de_id || editado.id;
        return idA === idB ? editado : d;
      })
    );
    setShowEditar(false);
  };

  const deletar = async () => {
    if (!selecionado) return;
    const id = selecionado.de_id || selecionado.id;
    if (!id) {
      // fallback to local removal
      setDesafios((prev) => prev.filter((d) => d !== selecionado));
      setShowExcluir(false);
      return;
    }

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

      setDesafios((prev) => prev.filter((d) => (d.de_id || d.id) !== id));
      setShowExcluir(false);
    } catch (error) {
      console.error("Erro ao deletar desafio:", error);
      alert("Erro ao deletar desafio");
    }
  };

  // Fetch backend desafios on mount
  useEffect(() => {
    const fetchDesafios = async () => {
      try {
        setCarregando(true);
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/desafios`, {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json; charset=utf-8" },
        });
        if (!res.ok) throw new Error("Erro ao buscar desafios");
        const data = await res.json();
        setDesafios(data || []);
      } catch (error) {
        console.error(error);
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
            onChange={(e) => setBusca(e.target.value)}
          />
          <button className="add-btn" onClick={() => setShowAdd(true)}>
            + Criar Desafio
          </button>
        </div>
      </div>

      {/* TABELA */}
      <table className="tabela">
        <thead>
          <tr>
            <th>#</th>
            <th>Desafio</th>
            <th>Tipo</th>
            <th>Duração</th>
            <th>Pontos</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {carregando ? (
            <tr>
              <td colSpan="7" className="sem-resultado">
                Carregando desafios...
              </td>
            </tr>
          ) : exibidos.length > 0 ? (
            exibidos.map((d, index) => (
              <tr key={d.de_id || d.id || index}>
                <td>{inicio + index + 1}</td>

                <td className="user-info">
                  <div className="icone purple">
                    {d.de_icone || d.icone || "🎯"}
                  </div>
                  <div>
                    <strong>{d.de_nome || d.nome}</strong>
                    <small>{d.de_descricao || d.descricao}</small>
                  </div>
                </td>

                <td>{d.de_tag || d.tipo}</td>
                <td>
                  {d.de_duracao ||
                    d.duracao ||
                    (d.de_end ? d.de_end.split("T")[0] : "")}
                </td>
                <td>⭐ {d.de_pontos || d.pontos}</td>

                <td>
                  <span
                    className={`status ${
                      String(d.de_status || d.status).toLowerCase() === "ativo"
                        ? "pago"
                        : String(d.de_status || d.status).toLowerCase() ===
                          "programado"
                        ? "pendente"
                        : "cancelado"
                    }`}
                  >
                    {d.de_status || d.status}
                  </span>
                </td>

                <td>
                  {/* EDITAR */}
                  <button
                    className="action-btn"
                    title="Editar Desafio"
                    onClick={() => {
                      setSelecionado(d);
                      setShowEditar(true);
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  {/* EXCLUIR */}
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

                  {/* DETALHES */}
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
              <td colSpan="7" className="sem-resultado">
                Nenhum desafio encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* === PAGINAÇÃO === */}
      {totalPaginas > 1 && (
        <div className="paginacao">
          <span>Itens por página:</span>
          <select
            value={itensPagina}
            onChange={(e) => {
              setItensPagina(Number(e.target.value));
              setPagina(1);
            }}
          >
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>

          <div className="pages">
            <button
              className="page"
              disabled={pagina === 1}
              onClick={() => mudarPagina(pagina - 1)}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => (
              <button
                key={i}
                className={`page ${pagina === i + 1 ? "active" : ""}`}
                onClick={() => mudarPagina(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="page"
              disabled={pagina === totalPaginas}
              onClick={() => mudarPagina(pagina + 1)}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      )}

      {/* ===== MODAIS ===== */}
      {showAdd && (
        <AddDesafio onClose={() => setShowAdd(false)} onSave={adicionar} />
      )}
      {showEditar && selecionado && (
        <EditarDesafio
          desafio={selecionado}
          onClose={() => setShowEditar(false)}
          onSave={atualizar}
        />
      )}
      {showDetalhes && selecionado && (
        <DetalhesDesafio
          desafio={selecionado}
          onClose={() => setShowDetalhes(false)}
        />
      )}
      {showExcluir && selecionado && (
        <ExcluirDesafio
          desafio={selecionado}
          onClose={() => setShowExcluir(false)}
          onConfirm={deletar}
        />
      )}
    </div>
  );
}
