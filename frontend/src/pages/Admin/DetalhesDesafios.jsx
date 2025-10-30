import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/pages/admin/treinos.scss";

export default function DetalhesDesafio() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simulando dados (pode ser substituído por API futuramente)
  const [desafio, setDesafio] = useState({
    id: id || "DS-1001",
    nome: "Desafio 7 Dias",
    tipo: "Frequência",
    duracao: "7 dias",
    pontos: 100,
    status: "Ativo",
    descricao:
      "Desafio voltado para consistência de treino, o objetivo é treinar todos os dias por 7 dias seguidos. Ideal para alunos que buscam disciplina e foco.",
    participantes: [
      { nome: "Maria Silva", progresso: "Completo" },
      { nome: "Pedro Alves", progresso: "Em andamento" },
      { nome: "Ana Santos", progresso: "Completo" },
    ],
  });

  const handleEditar = () => {
    const novoNome = prompt("Editar nome do desafio:", desafio.nome);
    if (novoNome) setDesafio({ ...desafio, nome: novoNome });
  };

  return (
    <div className="detalhes-treino">
      <h2>{desafio.nome}</h2>
      <div className="info">
        <span>{desafio.tipo}</span> • <span>{desafio.duracao}</span> •{" "}
        <span>{desafio.status}</span> • <span>⭐ {desafio.pontos} pontos</span>
      </div>

      <p className="descricao">{desafio.descricao}</p>

      <h4>Participantes</h4>
      <table className="tabela">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Progresso</th>
          </tr>
        </thead>
        <tbody>
          {desafio.participantes.map((p, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{p.nome}</td>
              <td>
                <span
                  className={`status ${
                    p.progresso === "Completo" ? "pago" : "pendente"
                  }`}
                >
                  {p.progresso}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="actions">
        <button className="btn btn-outline" onClick={() => navigate(-1)}>
          Voltar
        </button>
        <button className="btn btn-purple" onClick={handleEditar}>
          Editar Desafio
        </button>
      </div>
    </div>
  );
}
