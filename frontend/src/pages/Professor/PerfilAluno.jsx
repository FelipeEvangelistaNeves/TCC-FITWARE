import React, { useEffect, useState } from "react";
import "../../styles/pages/professor/perfilAluno.scss";

export default function PerfilAluno({ aluno, onBack }) {

  const [treinos, setTreinos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchTreinos = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/professor/alunos/${aluno.al_id}/treinos`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Erro ao buscar treinos");

        const data = await res.json();
        setTreinos(data.treinos || []);
      } catch (err) {
        console.error(err);
      } finally {
        setCarregando(false);
      }
    };

    fetchTreinos();
  }, [aluno]);

  return (
    <div className="aluno-detalhes">
      <div className="top-row">
        <button className="back" onClick={onBack}>←</button>
        <h3>Perfil do Aluno</h3>
      </div>

      <div className="perfil">
        <div className="avatar blue">
          {aluno.al_nome
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase()}
        </div>

        <div className="info">
          <h2>{aluno.al_nome}</h2>
          <p className="sub">
            Pontos {aluno.al_pontos} • {aluno.al_status}
          </p>
        </div>
      </div>

      <div className="tabs">
        <button className="ativo">Histórico</button>
      </div>

      <div className="lista-treinos">
        {carregando && <p>Carregando treinos...</p>}

        {!carregando && treinos.length === 0 && (
          <p style={{ textAlign: "center" }}>Nenhum treino encontrado.</p>
        )}

        {treinos.map((t) => (
          <div className="card-treino" key={t.at_id}>
            <div className="header">
              <span className="titulo">{t.Treino.tr_titulo}</span>
              <span className="data">
                {new Date(t.at_data_envio).toLocaleDateString("pt-BR")}
              </span>
            </div>

            <ul>
              {t.Treino.TreinoExercicios.map((te) => (
                <li key={te.te_id}>
                  {te.Exercicio.ex_nome}: {te.te_series}×{te.te_repeticoes}
                </li>
              ))}
            </ul>

            <div className="acoes-card">
              <button className="detalhes">Ver Detalhes</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}