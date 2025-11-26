import React, { useEffect, useState } from "react";
import "../../styles/pages/admin/treinosmodal.scss";

export default function DetalhesTreino({ treino, onClose }) {
  const [treinoDetalhes, setTreinoDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetalhes = async () => {
      if (!treino) {
        setLoading(false);
        return;
      }

      const treinoId = treino.tr_id || treino.id;
      if (!treinoId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/treinos/detalhes/${treinoId}`,
          { credentials: "include" }
        );

        if (res.ok) {
          const data = await res.json();
          setTreinoDetalhes(data);
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes do treino:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalhes();
  }, [treino]);

  if (!treino) {
    return (
      <div className="treino-overlay">
        <div className="treino-modal">
          <div className="treino-modal-header">
            <h2>Treino não selecionado</h2>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <p>Nenhum treino foi selecionado para visualizar.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="treino-overlay">
        <div className="treino-modal">
          <div className="treino-modal-header">
            <h2>Carregando...</h2>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <p>Por favor, aguarde...</p>
          </div>
        </div>
      </div>
    );
  }

  const dados = treinoDetalhes || treino;

  return (
    <div className="treino-overlay">
      <div className="treino-modal detalhes-modal">
        {/* Botão fechar */}
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Cabeçalho */}
        <div className="treino-modal-header">
          <h2>{dados.tr_nome ? dados.tr_nome : dados.nome}</h2>
          <span className="categoria">
            {dados.tr_dificuldade
              ? dados.tr_dificuldade
              : dados.dificuldade
              ? dados.dificuldade
              : "Sem dificuldade"}
          </span>
        </div>

        <div className="treino-modal-body">
          <p className="descricao">
            {dados.tr_descricao ? dados.tr_descricao : dados.descricao}
          </p>

          {/* Professor */}
          {dados.Funcionario && (
            <div className="professor-info">
              <div className="avatar">
                {dados.Funcionario.fu_nome.substring(0, 2).toUpperCase()}
              </div>
              <div className="professor-dados">
                <span className="nome">{dados.Funcionario.fu_nome}</span>
                <span className="especialidade">
                  {dados.Funcionario.fu_especialidade || "Sem especialidade"}
                </span>
              </div>
            </div>
          )}

          {/* Lista de exercícios */}
          <div className="treino-section exercises-container">
            <h3>Exercícios</h3>
            {dados.Exercicios && dados.Exercicios.length > 0 ? (
              dados.Exercicios.map((ex, i) => {
                const series = ex.TreinoExercicio
                  ? ex.TreinoExercicio.te_series
                  : ex.series;
                const repeticoes = ex.TreinoExercicio
                  ? ex.TreinoExercicio.te_repeticoes
                  : ex.repeticoes;
                const descanso = ex.TreinoExercicio
                  ? ex.TreinoExercicio.te_descanso
                  : ex.descanso;
                const instrucao = ex.ex_instrucao
                  ? ex.ex_instrucao
                  : ex.instrucao;

                return (
                  <div
                    className="exercicio-item"
                    key={ex.ex_id ? ex.ex_id : ex.id}
                  >
                    <div className="ex-nome">
                      {i + 1}. {ex.ex_nome ? ex.ex_nome : ex.nome}
                    </div>

                    <div className="ex-detalhes">
                      {series && (
                        <div className="detalhe-field">
                          <span className="label">Séries:</span>
                          <span className="value">{series}</span>
                        </div>
                      )}
                      {repeticoes && (
                        <div className="detalhe-field">
                          <span className="label">Repetições:</span>
                          <span className="value">{repeticoes}</span>
                        </div>
                      )}
                      {descanso && (
                        <div className="detalhe-field">
                          <span className="label">Descanso:</span>
                          <span className="value">{descanso}s</span>
                        </div>
                      )}
                    </div>

                    {instrucao ? (
                      <div className="ex-instrucao">
                        <strong>Instruções:</strong> {instrucao}
                      </div>
                    ) : null}
                  </div>
                );
              })
            ) : (
              <p className="sem-exercicios">Nenhum exercício cadastrado.</p>
            )}
          </div>

          {/* Alunos que recebem este treino */}
          <div className="treino-section alunos-section">
            <h3>Alunos Atribuídos</h3>
            {dados.Alunos && dados.Alunos.length > 0 ? (
              <div className="alunos-list">
                {dados.Alunos.map((aluno) => (
                  <div className="aluno-item" key={aluno.al_id}>
                    <div className="aluno-avatar">
                      {(aluno.al_nome ? aluno.al_nome : aluno.nome)
                        .substring(0, 2)
                        .toUpperCase()}
                    </div>
                    <span className="aluno-nome">
                      {aluno.al_nome ? aluno.al_nome : aluno.nome}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="sem-alunos">
                Nenhum aluno atribuído a este treino.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
