import React from "react";
import "../../styles/pages/professor/detalhesTreino.scss";

export default function DetalhesTreino({ treino, onClose }) {
  if (!treino) {
    return (
      <div className="detalhes-treino-overlay">
        <div className="detalhes-treino-modal">
          <p className="erro">Nenhum treino selecionado</p>
          <button className="close-btn" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detalhes-treino-overlay">
      <div className="detalhes-treino-modal">
        {/* Botão fechar */}
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Cabeçalho */}
        <div className="header">
          <h2>{treino.tr_nome || treino.nome}</h2>
          <span className="categoria">
            {treino.tr_dificuldade || treino.dificuldade || "Sem dificuldade"}
          </span>
        </div>

        <p className="descricao">{treino.tr_descricao || treino.descricao}</p>

        {/* Professor */}
        <div className="professor-info">
          <div className="avatar">
            {treino.Funcionario?.fu_nome || treino.funcionario
              ? (treino.Funcionario?.fu_nome || treino.funcionario)
                  .substring(0, 2)
                  .toUpperCase()
              : "??"}
          </div>
          <div className="professor-dados">
            <span className="nome">
              {treino.Funcionario?.fu_nome ||
                treino.funcionario ||
                "Professor não atribuído"}
            </span>
            <span className="especialidade">
              {treino.Funcionario?.fu_especialidade || "Sem especialidade"}
            </span>
          </div>
        </div>

        {/* Lista de exercícios */}
        <div className="exercicios">
          <h3>Exercícios</h3>
          {treino.Exercicios?.length > 0 || treino.exercicios?.length > 0 ? (
            (treino.Exercicios || treino.exercicios || []).map((ex, i) => {
              const series = ex.ex_series ?? ex.series;
              const repeticoes = ex.ex_repeticoes ?? ex.repeticoes;
              const descanso = ex.ex_descanso ?? ex.descanso;
              const instrucao = ex.ex_intrucao ?? ex.instrucao;

              return (
                <div className="exercicio-item" key={ex.ex_id || ex.id}>
                  <div className="ex-nome">
                    {i + 1}. {ex.ex_nome || ex.nome}
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

                  {instrucao && (
                    <div className="ex-instrucao">
                      <strong>Instruções:</strong> {instrucao}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="sem-exercicios">Nenhum exercício cadastrado.</p>
          )}
        </div>

        {/* Alunos que recebem este treino */}
        <div className="alunos-section">
          <h3>Alunos Atribuídos</h3>
          {treino.Alunos?.length > 0 || treino.alunos?.length > 0 ? (
            <div className="alunos-list">
              {(treino.Alunos || treino.alunos || []).map((aluno) => (
                <div className="aluno-item" key={aluno.al_id}>
                  <div className="aluno-avatar">
                    {(aluno.al_nome || aluno.nome)
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>
                  <span className="aluno-nome">
                    {aluno.al_nome || aluno.nome}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="sem-alunos">Nenhum aluno atribuído a este treino.</p>
          )}
        </div>
      </div>
    </div>
  );
}
