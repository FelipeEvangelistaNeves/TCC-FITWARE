import React, { useEffect, useState } from "react";
import "../../styles/pages/professor/detalhesTreino.scss";

export default function DetalhesTreino({ treino, onClose }) {
  const [detalhes, setDetalhes] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchDetalhes = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/treinos/${treino.tr_id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Erro ao buscar detalhes do treino");

        const data = await res.json();
        setDetalhes(data);
      } catch (error) {
        console.error(error);
        setErro("Erro ao carregar detalhes do treino");
      } finally {
        setCarregando(false);
      }
    };

    fetchDetalhes();
  }, [treino.tr_id]);

  if (carregando)
    return (
      <div className="detalhes-treino-overlay">
        <div className="detalhes-treino-modal">
          <p>Carregando treino...</p>
        </div>
      </div>
    );

  if (erro)
    return (
      <div className="detalhes-treino-overlay">
        <div className="detalhes-treino-modal">
          <p className="erro">{erro}</p>
          <button className="close-btn" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    );

  return (
    <div className="detalhes-treino-overlay">
      <div className="detalhes-treino-modal">
        {/* Botão fechar */}
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Cabeçalho */}
        <div className="header">
          <h2>{detalhes.tr_nome}</h2>
          <span className="categoria">
            {detalhes.tr_categoria || "Sem categoria"}
          </span>
        </div>

        <p className="descricao">{detalhes.tr_descricao}</p>

        {/* Professor */}
        <div className="professor-info">
          <div className="avatar">
            {detalhes.Funcionario?.fu_nome
              ? detalhes.Funcionario.fu_nome.substring(0, 2).toUpperCase()
              : "??"}
          </div>
          <div className="professor-dados">
            <span className="nome">
              {detalhes.Funcionario?.fu_nome || "Professor não atribuído"}
            </span>
            <span className="especialidade">
              {detalhes.Funcionario?.fu_especialidade || "Sem especialidade"}
            </span>
          </div>
        </div>

        {/* Lista de exercícios */}
        <div className="exercicios">
          <h3>Exercícios</h3>
          {detalhes.Exercicios?.length > 0 ? (
            detalhes.Exercicios.map((ex, i) => (
              <div className="exercicio-item" key={ex.ex_id}>
                <div className="ex-nome">
                  {i + 1}. {ex.ex_nome}
                </div>
                <div className="ex-info">
                  <span>{ex.ex_repeticoes || "–"} repetições</span>
                  <span>{ex.ex_series ? `${ex.ex_series} séries` : ""}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="sem-exercicios">Nenhum exercício cadastrado.</p>
          )}
        </div>

        {/* Rodapé */}
        <div className="footer">
          <button className="btn-registrar">Registrar Treino</button>
        </div>
      </div>
    </div>
  );
}
