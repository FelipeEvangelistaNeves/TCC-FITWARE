import React, { useState } from "react";
import "../../styles/pages/admin/treinos.scss";

export default function EnviarTreino() {
  const [buscaTreino, setBuscaTreino] = useState("");
  const [buscaAluno, setBuscaAluno] = useState("");
  const [selecionado, setSelecionado] = useState(1);
  const [alunosSelecionados, setAlunosSelecionados] = useState([
    "MS",
    "PA",
    "CM",
  ]);

  const treinos = [
    {
      id: 1,
      nome: "Treino de Força",
      tipo: "Força",
      duracao: "45 min",
      nivel: "Intermediário",
      exercicios: [
        "Agachamento",
        "Supino",
        "Remada",
        "Leg Press",
        "Elevação Lateral",
        "Abdominal",
      ],
      descricao:
        "Treino de força focado em membros superiores e inferiores, ideal para ganho de massa muscular e resistência.",
    },
  ];

  const alunos = [
    { id: "MS", nome: "Maria Silva", cor: "purple" },
    { id: "PA", nome: "Pedro Alves", cor: "green" },
    { id: "CM", nome: "Carlos Mendes", cor: "orange" },
    { id: "AS", nome: "Ana Santos", cor: "red" },
    { id: "RL", nome: "Ricardo Lima", cor: "blue" },
  ];

  const toggleAluno = (id) => {
    setAlunosSelecionados((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const limparSelecionados = () => setAlunosSelecionados([]);

  return (
    <div className="enviar-treino">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <i
          className="bi bi-arrow-left"
          onClick={() => window.history.back()}
          style={{ cursor: "pointer", fontSize: "24px" }}
        ></i>
        <h2>Enviar Treino</h2>
      </div>
      <div className="enviar-grid">
        {/* Selecionar Treino */}
        <div className="treino-select">
          <h5>Selecionar Treino</h5>
          <input
            type="text"
            placeholder="Buscar treino..."
            value={buscaTreino}
            onChange={(e) => setBuscaTreino(e.target.value)}
          />

          <div className="filtros">
            {["Todos", "Força", "Cardio", "Funcional", "Flexibilidade"].map(
              (f) => (
                <button key={f} className="filtro">
                  {f}
                </button>
              )
            )}
          </div>

          {treinos
            .filter((t) =>
              t.nome.toLowerCase().includes(buscaTreino.toLowerCase())
            )
            .map((t) => (
              <div
                key={t.id}
                className={`treino-card ${
                  selecionado === t.id ? "selecionado" : ""
                }`}
                onClick={() => setSelecionado(t.id)}
              >
                <div className="titulo">
                  <i className="bi bi-lightning-charge-fill"></i>
                  <div>
                    <strong>{t.nome}</strong>
                    <div className="meta">
                      <span>{t.duracao}</span> • <span>{t.nivel}</span> •{" "}
                      <span>{t.exercicios.length} exercícios</span>
                    </div>
                  </div>
                  {selecionado === t.id && (
                    <span className="badge bg-success">Selecionado</span>
                  )}
                </div>

                <p className="descricao">{t.descricao}</p>
                <ul className="ex-list">
                  {t.exercicios.map((ex, i) => (
                    <li key={i}>
                      <span>{i + 1}</span> {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          <textarea
            className="mensagem"
            placeholder="Mensagem (opcional)"
          ></textarea>
        </div>

        {/* Selecionar Alunos */}
        <div className="aluno-select">
          <h5>Selecionar Alunos</h5>
          <input
            type="text"
            placeholder="Buscar aluno..."
            value={buscaAluno}
            onChange={(e) => setBuscaAluno(e.target.value)}
          />

          <div className="top-alunos">
            <span>Alunos Selecionados ({alunosSelecionados.length})</span>
            <button onClick={limparSelecionados}>Limpar</button>
          </div>

          <div className="lista-alunos">
            {alunos
              .filter((a) =>
                a.nome.toLowerCase().includes(buscaAluno.toLowerCase())
              )
              .map((a) => (
                <div key={a.id} className="aluno-item">
                  <input
                    type="checkbox"
                    checked={alunosSelecionados.includes(a.id)}
                    onChange={() => toggleAluno(a.id)}
                  />
                  <div className={`icone ${a.cor}`}>{a.id}</div>
                  <span>{a.nome}</span>
                </div>
              ))}
          </div>

          <button className="btn btn-purple mb-3">→ Enviar Treino</button>
        </div>
      </div>
    </div>
  );
}
