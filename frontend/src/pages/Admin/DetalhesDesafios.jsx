// src/pages/admin/modals/DetalhesDesafio.jsx
import React, { useEffect, useState } from "react";
import "../../styles/pages/admin/forms.scss";

export default function DetalhesDesafio({ desafio, onClose }) {
  if (!desafio) return null;

  const [alunos, setAlunos] = useState([]);
  const [loadingAlunos, setLoadingAlunos] = useState(false);
  const [editing, setEditing] = useState({}); // al_id -> { value, saving }

  // Função para formatar data
  const formatarData = (dataString) => {
    if (!dataString) return "-";
    try {
      const data = new Date(dataString);
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

  useEffect(() => {
    const fetchAlunos = async () => {
      if (!desafio) return;
      const id = desafio.de_id;
      if (!id) return;

      setLoadingAlunos(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/desafios/${id}/alunos`,
          {
            method: "GET",
            credentials: "include",
            headers: { Accept: "application/json" },
          }
        );

        if (!res.ok) {
          console.error("Falha ao buscar alunos do desafio");
          setAlunos([]);
        } else {
          const data = await res.json();
          setAlunos(data.alunos || []);

          // Inicializa valores de edição
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
    setEditing((prev) => ({
      ...prev,
      [al_id]: { ...(prev[al_id] || {}), value: Number(value) },
    }));
  };

  const saveProgress = async (aluno) => {
    const idDesafio = desafio.de_id;
    const al_id = aluno.al_id;
    const edit = editing[al_id];
    if (!edit) return;

    setEditing((prev) => ({
      ...prev,
      [al_id]: { ...prev[al_id], saving: true },
    }));

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/desafios/${idDesafio}/alunos/${al_id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ad_progresso: Number(edit.value) }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Falha ao atualizar progresso");
        return;
      }

      const data = await res.json();

      // Atualiza lista local de alunos
      setAlunos((prev) =>
        prev.map((a) =>
          a.al_id === al_id
            ? {
                ...a,
                ad_progresso: data.registro.ad_progresso,
                ad_status: data.registro.ad_status,
              }
            : a
        )
      );

      alert("Progresso atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar progresso");
    } finally {
      setEditing((prev) => ({
        ...prev,
        [al_id]: { ...(prev[al_id] || {}), saving: false },
      }));
    }
  };

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Detalhes do Desafio</h3>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="modal-body">
            <div className="detalhes-content">
              <div className="detalhe-item">
                <span className="detalhe-label">Nome</span>
                <span className="detalhe-value">{desafio.de_nome}</span>
              </div>

              <div className="detalhe-item">
                <span className="detalhe-label">Descrição</span>
                <span className="detalhe-value">
                  {desafio.de_descricao || "-"}
                </span>
              </div>

              <div className="detalhe-item">
                <span className="detalhe-label">Tipo</span>
                <span className="detalhe-value">{desafio.de_tag || "-"}</span>
              </div>

              <div className="detalhe-item">
                <span className="detalhe-label">Pontos</span>
                <span className="detalhe-value">⭐ {desafio.de_pontos}</span>
              </div>

              <div className="detalhe-item">
                <span className="detalhe-label">Data de Início</span>
                <span className="detalhe-value">
                  {formatarData(desafio.de_start)}
                </span>
              </div>

              <div className="detalhe-item">
                <span className="detalhe-label">Data de Término</span>
                <span className="detalhe-value">
                  {formatarData(desafio.de_end)}
                </span>
              </div>

              <div className="detalhe-item">
                <span className="detalhe-label">Status</span>
                <span className="detalhe-value">
                  <span
                    className={`status ${String(
                      desafio.de_status || ""
                    ).toLowerCase()}`}
                  >
                    {desafio.de_status}
                  </span>
                </span>
              </div>

              <div className="detalhe-item">
                <span className="detalhe-label">Progresso Geral</span>
                <span className="detalhe-value">
                  {desafio.de_progresso || 0}%
                </span>
              </div>
            </div>

            {/* Seção de Alunos Aplicados */}
            <div
              style={{
                marginTop: "2rem",
                paddingTop: "1.5rem",
                borderTop: "2px solid var(--border-color)",
              }}
            >
              <h4 style={{ marginBottom: "1rem", color: "var(--color-text)" }}>
                Alunos Aplicados
              </h4>

              {loadingAlunos ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  Carregando alunos...
                </div>
              ) : alunos.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "var(--color-text-muted)",
                    fontStyle: "italic",
                  }}
                >
                  Nenhum aluno aplicado neste desafio
                </div>
              ) : (
                <div className="tabela-wrapper">
                  <table className="tabela" style={{ marginTop: "0.5rem" }}>
                    <thead>
                      <tr>
                        <th>Aluno</th>
                        <th>Email</th>
                        <th style={{ textAlign: "center" }}>Progresso</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                        <th style={{ textAlign: "center" }}>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alunos.map((a) => (
                        <tr key={a.al_id}>
                          <td>
                            <strong>{a.al_nome}</strong>
                          </td>
                          <td>{a.al_email}</td>
                          <td style={{ textAlign: "center" }}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={
                                  editing[a.al_id]?.value ?? a.ad_progresso ?? 0
                                }
                                onChange={(e) =>
                                  handleChange(a.al_id, e.target.value)
                                }
                                style={{ width: "100%", maxWidth: "150px" }}
                              />
                              <span
                                style={{
                                  fontSize: "0.9rem",
                                  fontWeight: "600",
                                  color: "var(--color-purple)",
                                }}
                              >
                                {editing[a.al_id]?.value ?? a.ad_progresso ?? 0}
                                %
                              </span>
                            </div>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <span
                              className={`status ${String(
                                a.ad_status || ""
                              ).toLowerCase()}`}
                            >
                              {a.ad_status || "Pendente"}
                            </span>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <button
                              disabled={editing[a.al_id]?.saving}
                              onClick={() => saveProgress(a)}
                              className="btn-salvar"
                              style={{
                                padding: "0.5rem 1rem",
                                fontSize: "0.85rem",
                              }}
                            >
                              {editing[a.al_id]?.saving
                                ? "Salvando..."
                                : "Salvar"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button className="btn-cancelar" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
