// src/pages/admin/modals/DetalhesDesafio.jsx
import React, { useEffect, useState } from "react";
import "../../styles/pages/admin/forms.scss";

export default function DetalhesDesafio({ desafio, onClose }) {
  if (!desafio) return null;

  const [alunos, setAlunos] = useState([]);
  const [loadingAlunos, setLoadingAlunos] = useState(false);
  const [editing, setEditing] = useState({}); // al_id -> { value, saving }

  useEffect(() => {
    const fetchAlunos = async () => {
      if (!desafio) return;
      // desafio might have de_id or id
      const id = desafio.de_id || desafio.id;
      if (!id) return;

      setLoadingAlunos(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/desafios/${id}/alunos`, {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) {
          console.error("Falha ao buscar alunos do desafio");
          setAlunos([]);
        } else {
          const data = await res.json();
          setAlunos(data.alunos || []);
          // initialize editing values
          const map = {};
          (data.alunos || []).forEach((a) => {
            map[a.al_id] = { value: a.ad_progresso || 0, saving: false };
          });
          setEditing(map);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingAlunos(false);
      }
    };

    fetchAlunos();
  }, [desafio]);

  const handleChange = (al_id, value) => {
    setEditing((prev) => ({ ...prev, [al_id]: { ...(prev[al_id] || {}), value } }));
  };

  const saveProgress = async (aluno) => {
    const idDesafio = desafio.de_id || desafio.id;
    const al_id = aluno.al_id;
    const edit = editing[al_id];
    if (!edit) return;

    setEditing((prev) => ({ ...prev, [al_id]: { ...prev[al_id], saving: true } }));

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/desafios/${idDesafio}/alunos/${al_id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ad_progresso: Number(edit.value) }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Falha ao atualizar progresso");
        return;
      }

      const data = await res.json();

      // update local alunos list
      setAlunos((prev) => prev.map((a) => (a.al_id === al_id ? { ...a, ad_progresso: data.registro.ad_progresso, ad_status: data.registro.ad_status } : a)));
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar progresso");
    } finally {
      setEditing((prev) => ({ ...prev, [al_id]: { ...(prev[al_id] || {}), saving: false } }));
    }
  };

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3>{desafio.nome}</h3>

          <p style={{ color: "var(--color-text-muted)" }}>
            {desafio.descricao}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginTop: 12,
            }}
          >
            <div>
              <strong>Tipo</strong>
              <div>{desafio.tipo}</div>
            </div>
            <div>
              <strong>Duração</strong>
              <div>{desafio.duracao}</div>
            </div>
            <div>
              <strong>Participantes</strong>
              <div>{desafio.participantes}</div>
            </div>
            <div>
              <strong>Pontos</strong>
              <div>⭐ {desafio.pontos}</div>
            </div>
            <div>
              <strong>Status</strong>
              <div>{desafio.status}</div>
            </div>
            <div>
              <strong>Ícone</strong>
              <div>{desafio.icone}</div>
            </div>
          </div>

          {/* Alunos aplicados (admin) */}
          <hr style={{ marginTop: 16 }} />
          <h4 style={{ marginTop: 8 }}>Alunos aplicados</h4>

          {loadingAlunos ? (
            <div>Carregando alunos...</div>
          ) : alunos.length === 0 ? (
            <div>Nenhum aluno aplicado</div>
          ) : (
            <div style={{ marginTop: 8 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Aluno</th>
                    <th>Email</th>
                    <th>Progresso</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {alunos.map((a) => (
                    <tr key={a.al_id} style={{ borderTop: "1px solid #eee" }}>
                      <td style={{ padding: 8 }}>
                        <strong>{a.al_nome}</strong>
                      </td>
                      <td style={{ padding: 8 }}>{a.al_email}</td>
                      <td style={{ padding: 8 }}>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={editing[a.al_id]?.value ?? a.ad_progresso ?? 0}
                          onChange={(e) => handleChange(a.al_id, e.target.value)}
                        />
                        <div style={{ fontSize: 12 }}>{editing[a.al_id]?.value ?? a.ad_progresso}%</div>
                      </td>
                      <td style={{ padding: 8 }}>{a.ad_status}</td>
                      <td style={{ padding: 8 }}>
                        <button
                          disabled={editing[a.al_id]?.saving}
                          onClick={() => saveProgress(a)}
                          className="action-btn"
                        >
                          {editing[a.al_id]?.saving ? "Salvando..." : "Salvar"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="modal-actions" style={{ marginTop: 20 }}>
            <button className="btn-cancelar" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
