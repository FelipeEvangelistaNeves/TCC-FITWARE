import React, { useState, useEffect } from "react";
import "../../styles/pages/admin/notificacoes.scss";

export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
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
      const res = await fetch("http://localhost:3000/api/avisos/allAvisos", {
        method: "GET",
        credentials: "include",
      });

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
      const res = await fetch("http://localhost:3000/api/avisos/createAvisos", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaNotificacao),
      });

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

  return (
    <div className="notifications-page">
      <div className="tabela-header">
        <h2>Gerenciar Notificações</h2>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Criar Notificação
        </button>
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

      {/* ===== LISTA ===== */}
      <div className="notificacoes-lista">
        {notificacoes
          .filter((n) => n && n.av_titulo)
          .map((n) => (
            <div key={n.av_id} className="notificacao-card">
              <div className="notificacao-header">
                <h4>{n.av_titulo}</h4>
                <span className={`tipo ${n.av_tipo.toLowerCase()}`}>
                  {n.av_tipo}
                </span>
              </div>

              <p>{n.av_mensagem}</p>

              <div className="notificacao-footer">
                <small>
                  {new Date(n.av_data_inicio).toLocaleString("pt-BR")}
                </small>
              </div>
            </div>
          ))}

        {notificacoes.length === 0 && (
          <p className="sem-notificacoes">Nenhuma notificação criada.</p>
        )}
      </div>
    </div>
  );
}
