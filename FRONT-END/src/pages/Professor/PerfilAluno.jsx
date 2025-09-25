import React from "react";
import "../../styles/pages/professor/perfilAluno.scss";

export default function PerfilAluno({ aluno, onBack }) {
  // se quiser, pode receber treinos via aluno.treinos
  const treinos = [
    { id: 1, titulo: "Treino de Força", data: "Hoje", itens: ["Agachamento: 3×12", "Supino: 3×10", "Remada: 3×10"] },
    { id: 2, titulo: "Treino de Cardio", data: "Ontem", itens: ["Corrida: 20 min", "Pular corda: 10 min", "Bicicleta: 15 min"] },
    { id: 3, titulo: "Treino Funcional", data: "3 dias atrás", itens: ["Burpees: 3×15", "Mountain Climbers: 3x30s", "Prancha: 3x45s"] },
  ];

  return (
    <div className="aluno-detalhes">
      <div className="top-row">
        <button className="back" onClick={onBack} aria-label="Voltar">←</button>
        <h3>Perfil do Aluno</h3>
      </div>

      <div className="perfil">
        <div className="avatar blue">MS</div>
        <div className="info">
          <h2>{aluno.nome}</h2>
          <p className="sub">{aluno.turma} • {aluno.tempo}</p>
        </div>
      </div>

      <div className="acoes">
        <button className="acao">📞<span>Ligar</span></button>
        <button className="acao">💬<span>Mensagem</span></button>
        <button className="acao">🏋️<span>Treino</span></button>
      </div>

      <div className="tabs">
        <button className="ativo">Histórico</button>
        <button>Informações</button>
      </div>

      <div className="lista-treinos">
        {treinos.map((t) => (
          <div className="card-treino" key={t.id}>
            <div className="header">
              <span className="titulo">{t.titulo}</span>
              <span className="data">{t.data}</span>
            </div>

            <ul>
              {t.itens.map((it, i) => <li key={i}>{it}</li>)}
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
