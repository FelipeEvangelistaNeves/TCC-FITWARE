import React, { useState } from "react";
import "../../styles/pages/admin/notificacoes.scss";

export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([
    {
      id: 1,
      titulo: "Bônus Especial Amanhã 🎁",
      mensagem:
        "Amanhã teremos um bônus especial para os alunos que completarem todos os treinos do dia!",
      data: "02/11/2025 - 15:30",
      tipo: "Informativo",
    },
    {
      id: 2,
      titulo: "Novo Desafio Disponível 💪",
      mensagem:
        "Participe do Desafio de Força 7 Dias e acumule pontos extras no FitWare!",
      data: "01/11/2025 - 10:00",
      tipo: "Desafio",
    },
    {
      id: 3,
      titulo: "Treino Atualizado 🔥",
      mensagem:
        "O treino de perna foi atualizado com novos exercícios. Confira com seu professor!",
      data: "31/10/2025 - 17:45",
      tipo: "Atualização",
    },
  ]);

  const [novaNotificacao, setNovaNotificacao] = useState({
    titulo: "",
    mensagem: "",
    tipo: "Informativo",
  });

  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    if (!novaNotificacao.titulo || !novaNotificacao.mensagem) return;

    const nova = {
      id: notificacoes.length + 1,
      titulo: novaNotificacao.titulo,
      mensagem: novaNotificacao.mensagem,
      data: new Date().toLocaleString("pt-BR"),
      tipo: novaNotificacao.tipo,
    };

    setNotificacoes([nova, ...notificacoes]);
    setNovaNotificacao({ titulo: "", mensagem: "", tipo: "Informativo" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setNotificacoes(notificacoes.filter((n) => n.id !== id));
  };

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
                value={novaNotificacao.titulo}
                onChange={(e) =>
                  setNovaNotificacao({
                    ...novaNotificacao,
                    titulo: e.target.value,
                  })
                }
                placeholder="Ex: Bônus especial amanhã 🎁"
              />
            </div>

            <div className="form-group">
              <label>Mensagem</label>
              <textarea
                rows="3"
                value={novaNotificacao.mensagem}
                onChange={(e) =>
                  setNovaNotificacao({
                    ...novaNotificacao,
                    mensagem: e.target.value,
                  })
                }
                placeholder="Ex: Amanhã teremos um bônus especial para os alunos que completarem todos os treinos do dia!"
              />
            </div>

            <div className="form-group">
              <label>Tipo</label>
              <select
                value={novaNotificacao.tipo}
                onChange={(e) =>
                  setNovaNotificacao({
                    ...novaNotificacao,
                    tipo: e.target.value,
                  })
                }
              >
                <option>Informativo</option>
                <option>Desafio</option>
                <option>Treino</option>
                <option>Brinde</option>
              </select>
            </div>

            <div className="modal-actions">
              <button
                className="btn-cancelar"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
              <button className="btn-salvar" onClick={handleAdd}>
                Enviar Notificação
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== LISTA DE NOTIFICAÇÕES ===== */}
      <div className="notificacoes-lista">
        {notificacoes.map((n) => (
          <div key={n.id} className="notificacao-card">
            <div className="notificacao-header">
              <h4>{n.titulo}</h4>
              <span className={`tipo ${n.tipo.toLowerCase()}`}>{n.tipo}</span>
            </div>
            <p>{n.mensagem}</p>
            <div className="notificacao-footer">
              <small>{n.data}</small>
              <button
                className="action-btn delete"
                onClick={() => handleDelete(n.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
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
