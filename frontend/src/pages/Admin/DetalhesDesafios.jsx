import React, { useEffect, useState } from "react";
import "../../styles/pages/admin/forms.scss";
import "../../styles/pages/admin/tabelas.scss";

export default function DetalhesDesafio({ desafio, onClose }) {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState({});

  if (!desafio) return null;

  const formatarData = (d) =>
    d && !isNaN(new Date(d)) ? new Date(d).toLocaleDateString("pt-BR") : "-";

  useEffect(() => {
    if (!desafio.de_id) return;

    const fetchAlunos = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/desafios/${desafio.de_id}/alunos`,
          { credentials: "include" }
        );
        if (!res.ok) return;

        const { alunos = [] } = await res.json();
        setAlunos(alunos);

        setEditing(
          Object.fromEntries(
            alunos.map((a) => [
              a.al_id,
              { value: a.ad_progresso || 0, saving: false },
            ])
          )
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAlunos();
  }, [desafio]);

  const handleChange = (id, value) =>
    setEditing((p) => ({ ...p, [id]: { ...p[id], value: +value } }));

  const saveProgress = async (aluno) => {
    const edit = editing[aluno.al_id];
    if (!edit) return;

    setEditing((p) => ({
      ...p,
      [aluno.al_id]: { ...edit, saving: true },
    }));

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/desafios/${desafio.de_id}/alunos/${
          aluno.al_id
        }`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ad_progresso: edit.value }),
        }
      );
      if (!res.ok) throw new Error();

      const { registro } = await res.json();
      setAlunos((p) =>
        p.map((a) => (a.al_id === aluno.al_id ? { ...a, ...registro } : a))
      );
      alert("Progresso atualizado!");
    } catch {
      alert("Erro ao salvar progresso");
    } finally {
      setEditing((p) => ({
        ...p,
        [aluno.al_id]: { ...p[aluno.al_id], saving: false },
      }));
    }
  };

  const campo = (label, value) => (
    <div className="form-group">
      <label>{label}</label>
      <input type="text" value={value} readOnly />
    </div>
  );

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Detalhes do Desafio</h3>

          {campo("Nome", desafio.de_nome)}
          {campo("Descrição", desafio.de_descricao || "-")}
          {campo("Tipo", desafio.de_tag || "-")}
          {campo("Pontos", `⭐ ${desafio.de_pontos}`)}
          {campo("Data de Início", formatarData(desafio.de_start))}
          {campo("Data de Término", formatarData(desafio.de_end))}
          {campo("Status", desafio.de_status)}
          {campo("Progresso Geral", `${desafio.de_progresso || 0}%`)}

          <section className="admin-section">
            <h4>Alunos Aplicados</h4>

            {loading ? (
              <p className="info">Carregando alunos...</p>
            ) : alunos.length === 0 ? (
              <p className="info italic">Nenhum aluno aplicado neste desafio</p>
            ) : (
              <table className="tabela">
                <thead>
                  <tr>
                    <th>Aluno</th>
                    <th>Email</th>
                    <th>Progresso</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {alunos.map((a) => (
                    <tr key={a.al_id}>
                      <td>
                        <strong>{a.al_nome}</strong>
                      </td>
                      <td>{a.al_email}</td>
                      <td className="center">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={editing[a.al_id]?.value ?? a.ad_progresso ?? 0}
                          onChange={(e) =>
                            handleChange(a.al_id, e.target.value)
                          }
                        />
                        <span className="progress">
                          {editing[a.al_id]?.value ?? a.ad_progresso ?? 0}%
                        </span>
                      </td>
                      <td className="center">
                        <span
                          className={`status ${(
                            a.ad_status || ""
                          ).toLowerCase()}`}
                        >
                          {a.ad_status || "Pendente"}
                        </span>
                      </td>
                      <td className="center">
                        <button
                          className="btn-salvar"
                          disabled={editing[a.al_id]?.saving}
                          onClick={() => saveProgress(a)}
                        >
                          {editing[a.al_id]?.saving ? "Salvando..." : "Salvar"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

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
