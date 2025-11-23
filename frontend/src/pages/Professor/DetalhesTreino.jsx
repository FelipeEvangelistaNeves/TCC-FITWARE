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
          <h2>{treino.tr_nome}</h2>
          <span className="categoria">
            {treino.tr_categoria || "Sem categoria"}
          </span>
        </div>

        <p className="descricao">{treino.tr_descricao}</p>

        {/* Professor */}
        <div className="professor-info">
          <div className="avatar">
            {treino.Funcionario?.fu_nome
              ? treino.Funcionario.fu_nome.substring(0, 2).toUpperCase()
              : "??"}
          </div>
          <div className="professor-dados">
            <span className="nome">
              {treino.Funcionario?.fu_nome || "Professor não atribuído"}
            </span>
            <span className="especialidade">
              {treino.Funcionario?.fu_especialidade || "Sem especialidade"}
            </span>
          </div>
        </div>

        {/* Lista de exercícios */}
        <div className="exercicios">
          <h3>Exercícios</h3>
          {treino.Exercicios?.length > 0 ? (
            treino.Exercicios.map((ex, i) => (
              <div className="exercicio-item" key={ex.ex_id}>
                <div className="ex-nome">
                  {i + 1}. {ex.ex_nome}
                </div>
                <div className="ex-info">
                  <span>
                    {ex.TreinoExercicio?.te_repeticoes || "–"} repetições
                  </span>
                  <span>
                    {ex.TreinoExercicio?.te_series
                      ? `${ex.TreinoExercicio.te_series} séries`
                      : ""}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="sem-exercicios">Nenhum exercício cadastrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
