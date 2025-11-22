import React, { useState, useEffect } from "react";
import "../../styles/pages/admin/tabelas.scss";
import AddBrinde from "./AddBrindes";
import EditarBrinde from "./EditarBrinde";
import DetalhesBrinde from "./DetalhesBrindes";
import ExcluirBrinde from "./ExcluirBrinde";

export default function Brindes() {
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [brindes, setBrindes] = useState([]);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  // 🔹 Buscar produtos do backend
  const fetchBrindes = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/produtos/all`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        const convertidos = data.produtos.map((p) => {
          let status = "";

          if (p.pd_estoque === 0) {
            status = "esgotado";
          } else if (p.pd_estoque <= 5) {
            status = "acabando";
          } else {
            status = "disponivel";
          }

          return {
            id: p.pd_id,
            nome: p.pd_nome,
            pontos: p.pd_valor,
            estoque: p.pd_estoque,
            status: status,
            descricao: p.pd_descricao,
          };
        });

        setBrindes(convertidos);
      }
    } catch (err) {
      console.error("Erro ao carregar brindes:", err);
    }
  };

  useEffect(() => {
    fetchBrindes();
  }, []);

  // 🔹 Criar brinde
  const handleAdd = async (novo) => {
    try {
      const body = {
        pd_nome: novo.nome,
        pd_valor: novo.pontos,
        pd_estoque: novo.estoque,
        pd_status: novo.status,
        pd_descricao: novo.descricao || "",
      };

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/produtos/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      if (data.success) {
        fetchBrindes();
        setShowAdd(false);
      }
    } catch (err) {
      console.error("Erro ao criar brinde:", err);
    }
  };

  // 🔹 Atualizar brinde
  const handleUpdate = async (editado) => {
    try {
      const body = {
        pd_nome: editado.nome,
        pd_valor: editado.pontos,
        pd_estoque: editado.estoque,
        pd_status: editado.status,
        pd_descricao: editado.descricao,
      };

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/produtos/update/${editado.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();
      if (data.success) {
        fetchBrindes();
        setShowEdit(false);
      }
    } catch (err) {
      console.error("Erro ao editar brinde:", err);
    }
  };

  // 🔹 Excluir brinde
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/produtos/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();
      if (data.success) {
        fetchBrindes();
        setShowDelete(false);
      }
    } catch (err) {
      console.error("Erro ao excluir brinde:", err);
    }
  };

  // ========================================
  // FILTROS E PAGINAÇÃO
  // ========================================

  const filtrados = brindes.filter((b) => {
    const termo = busca.toLowerCase();
    return b.nome.toLowerCase().includes(termo);
  });

  const totalPaginas = Math.ceil(filtrados.length / itemsPerPage) || 1;
  const inicio = (pagina - 1) * itemsPerPage;
  const paginados = filtrados.slice(inicio, inicio + itemsPerPage);

  const trocarPagina = (p) => p >= 1 && p <= totalPaginas && setPagina(p);

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
                        b.status === "disponivel"
                          ? "pago"
                          : b.status === "acabando"
                          ? "pendente"
                          : "cancelado"
                      }`}
                    >
                      {b.status === "disponivel"
                        ? "Disponível"
                        : b.status === "acabando"
                        ? "Acabando"
                        : "Esgotado"}
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
                      onClick={() => {
                        setSelected(b);
                        setShowDelete(true);
                      }}
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
          <span>Itens por página:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setPagina(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>

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

        {/* MODAIS */}
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

        {showDelete && selected && (
          <ExcluirBrinde
            brinde={selected}
            onClose={() => setShowDelete(false)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
