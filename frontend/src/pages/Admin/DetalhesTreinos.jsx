import React, { useEffect, useState } from "react";
import "../../styles/pages/admin/detalhestreinos.scss";

export default function DetalhesTreino({ treino, onClose }) {
  const [treinoDetalhes, setTreinoDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!treino) return setLoading(false);

    const fetchDetalhes = async () => {
      try {
        const id = treino.tr_id || treino.id;
        if (!id) return setLoading(false);

        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/treinos/detalhes/${id}`,
          { credentials: "include" }
        );

        if (res.ok) {
          const data = await res.json();
          setTreinoDetalhes(data);
        }
      } catch (e) {
        console.error("Erro ao carregar detalhes do treino:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalhes();
  }, [treino]);

  const dados = treinoDetalhes || treino;

  if (loading)
    return (
      <div className="treino-overlay" onClick={onClose}>
        <div className="treino-modal">
          <h2>Carregando...</h2>
        </div>
      </div>
    );

  if (!dados)
    return (
      <div className="treino-overlay" onClick={onClose}>
        <div className="treino-modal">
          <h2>Nenhum treino encontrado</h2>
        </div>
      </div>
    );

  return (
    <div className="treino-overlay" onClick={onClose}>
      <div
        className="treino-modal detalhes-treino-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="dt-header">
          <h2>{dados.nome}</h2>
          <span className="dt-dificuldade">
            {dados.dificuldade || "Não informado"}
          </span>
        </div>

        {/* CORPO */}
        <div className="dt-content">
          {/* DESCRIÇÃO */}
          {dados.descricao && <p className="dt-descricao">{dados.descricao}</p>}

          {/* PROFESSOR */}
          {dados.funcionario && (
            <div className="dt-professor">
              <div className="avatar">
                {dados.funcionario.substring(0, 2).toUpperCase()}
              </div>
              <span>{dados.funcionario}</span>
            </div>
          )}

          {/* EXERCÍCIOS */}
          <div className="dt-section">
            <h3>Exercícios</h3>

            {dados.exercicios?.length ? (
              dados.exercicios.map((ex, index) => (
                <div className="dt-ex-card" key={ex.ex_id}>
                  <div className="dt-ex-header">
                    <h4>
                      {index + 1}. {ex.nome}
                    </h4>
                  </div>

                  <div className="dt-ex-grid">
                    <p>
                      <span>Séries:</span> {ex.series}
                    </p>
                    <p>
                      <span>Repetições:</span> {ex.repeticoes}
                    </p>
                    <p>
                      <span>Descanso:</span> {ex.descanso}s
                    </p>
                  </div>

                  {ex.instrucao && (
                    <p className="dt-ex-instrucao">
                      <strong>Instruções:</strong> {ex.instrucao}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="dt-vazio">Nenhum exercício cadastrado</p>
            )}
          </div>

          {/* ALUNOS */}
          <div className="dt-section">
            <h3>Alunos Atribuídos</h3>

            {dados.alunos?.length ? (
              <div className="dt-alunos">
                {dados.alunos.map((aluno) => (
                  <div className="dt-aluno-item" key={aluno.al_id}>
                    <div className="avatar">
                      {aluno.al_nome.substring(0, 2).toUpperCase()}
                    </div>
                    <span>{aluno.al_nome}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="dt-vazio">Nenhum aluno atribuído</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
