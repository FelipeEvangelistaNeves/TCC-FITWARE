import React, { useState, useEffect } from "react";
import "../../styles/pages/admin/tabelas.scss";

export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [novaNotificacao, setNovaNotificacao] = useState({
    av_titulo: "",
    av_mensagem: "",
    av_tipo: "Informativo",
    av_destinatario_tipo: "Geral",
  });

  const [showForm, setShowForm] = useState(false);

  // ===== BUSCAR AVISOS =====
  async function fetchAvisos() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/avisos/allAvisos`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();
      setNotificacoes(data.avisos);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAvisos();
  }, []);

  // ===== CRIAR AVISO =====
  async function create() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/avisos/createAvisos`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novaNotificacao),
        }
      );

      if (!res.ok) throw new Error("Erro ao criar notificação");

      const updated = await res.json();

      // Adicionar aviso mantendo a ordem da data
      setNotificacoes((prev) => {
        const lista = [...prev, updated.aviso];
        return lista.sort(
          (a, b) => new Date(b.av_data_inicio) - new Date(a.av_data_inicio)
        );
      });

      // Resetar formulário
      setNovaNotificacao({
        av_titulo: "",
        av_mensagem: "",
        av_tipo: "Informativo",
        av_destinatario_tipo: "Geral",
      });

      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  }

  console.log(notificacoes);

  // ===== FILTROS E PAGINAÇÃO =====
  const filtrados = notificacoes.filter((n) => {
    const termo = busca.toLowerCase();
    return (
      n.av_titulo?.toLowerCase().includes(termo) ||
      n.av_mensagem?.toLowerCase().includes(termo)
    );
  });

  const totalPaginas = Math.ceil(filtrados.length / itemsPerPage) || 1;
  const inicio = (pagina - 1) * itemsPerPage;
  const paginados = filtrados.slice(inicio, inicio + itemsPerPage);

  const trocarPagina = (p) => p >= 1 && p <= totalPaginas && setPagina(p);

  return (
    <div className="admin-modal">
      <div className="tabela-page">
        <div className="tabela-header">
          <h2>Gerenciar Notificações</h2>
          <div className="acoes-header">
            <input
              type="text"
              placeholder="Buscar notificação..."
              className="search-input"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <button className="add-btn" onClick={() => setShowForm(true)}>
              + Criar Notificação
            </button>
          </div>
        </div>

        <table className="tabela">
          <thead>
            <tr>
              <th>Título</th>
              <th>Mensagem</th>
              <th>Tipo</th>
              <th>Destinatário</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {paginados.length > 0 ? (
              paginados.map((n) => (
                <tr key={n.av_id}>
                  <td>{n.av_titulo}</td>
                  <td>{n.av_mensagem}</td>
                  <td>
                    <span className={`status ${n.av_tipo.toLowerCase()}`}>
                      {n.av_tipo}
                    </span>
                  </td>
                  <td>{n.av_destinatario_tipo}</td>
                  <td>
                    <small>
                      {new Date(n.av_data_inicio).toLocaleString("pt-BR")}
                    </small>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="sem-resultado">
                  Nenhuma notificação encontrada.
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

        {/* ===== FORM ===== */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Criar Nova Notificação</h3>

              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  value={novaNotificacao.av_titulo}
                  onChange={(e) =>
                    setNovaNotificacao({
                      ...novaNotificacao,
                      av_titulo: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Mensagem</label>
                <textarea
                  rows="3"
                  value={novaNotificacao.av_mensagem}
                  onChange={(e) =>
                    setNovaNotificacao({
                      ...novaNotificacao,
                      av_mensagem: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Tipo</label>
                <select
                  value={novaNotificacao.av_tipo}
                  onChange={(e) =>
                    setNovaNotificacao({
                      ...novaNotificacao,
                      av_tipo: e.target.value,
                    })
                  }
                >
                  <option value="Informativo">Informativo</option>
                  <option value="Desafio">Desafio</option>
                  <option value="Treino">Treino</option>
                  <option value="Brinde">Brinde</option>
                </select>
              </div>

              <div className="form-group">
                <label>Destinatário</label>
                <select
                  value={novaNotificacao.av_destinatario_tipo}
                  onChange={(e) =>
                    setNovaNotificacao({
                      ...novaNotificacao,
                      av_destinatario_tipo: e.target.value,
                    })
                  }
                >
                  <option value="Geral">Geral</option>
                  <option value="Alunos">Alunos</option>
                  <option value="Professores">Professores</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  className="btn-cancelar"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>

                <button className="btn-salvar" onClick={create}>
                  Enviar Notificação
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
