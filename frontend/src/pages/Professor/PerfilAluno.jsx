import React, { useEffect, useState } from "react";
import "../../styles/pages/professor/perfilAluno.scss";

export default function PerfilAluno({ aluno, onBack }) {
  const [treinos, setTreinos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function fetchTreinos() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/professor/alunos/${
            aluno.al_id
          }/treinos`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Erro ao carregar mensagens");

        const data = await res.json();

        // 🔥 O erro estava aqui:
        // setTreinos(data);

        // ✔️ CORRETO:
        setTreinos(data.treinosAluno);
      } catch (err) {
        console.error("Erro ao buscar treinos:", err);
      } finally {
        setCarregando(false);
      }
    }

    fetchTreinos();
  }, []);

  return (
    <div className="aluno-detalhes">
      <div className="top-row">
        <button className="back" onClick={onBack}>
          ←
        </button>
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

        {treinos.map((item) => (
          <div className="card-treino" key={item.tr_id}>
            <div className="header">
              <span className="titulo">{item.Treino.tr_nome}</span>
              <span className="data">{item.Treino.tr_dificuldade}</span>
            </div>

            <ul>
              {item.Treino.Exercicios.map((ex) => (
                <li key={ex.ex_id}>
                  {ex.ex_nome} — {ex.TreinoExercicio.te_series}x
                  {ex.TreinoExercicio.te_repeticoes}
                </li>
              ))}
            </ul>

            <div className="acoes-card">
              <button className="detalhes">Ver Detalhes</button>
              <button className="duplicar">Duplicar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
