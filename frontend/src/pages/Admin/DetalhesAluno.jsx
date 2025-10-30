import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/pages/admin/treinos.scss";

export default function AlunoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simula dados
  const aluno = {
    id,
    nome: "Maria Silva",
    turma: "Funcional",
    status: "Ativo",
    descricao:
      "Aluno dedicada, participa das aulas de treino funcional 3x por semana e está evoluindo muito bem.",
  };

  return (
    <div className="detalhes-treino">
      <h2>{aluno.nome}</h2>
      <p className="descricao">{aluno.descricao}</p>

      <div className="info">
        <p>
          <strong>ID:</strong> {aluno.id}
        </p>
        <p>
          <strong>Turma:</strong> {aluno.turma}
        </p>
        <p>
          <strong>Status:</strong> {aluno.status}
        </p>
      </div>

      <div className="actions">
        <button
          className="btn btn-outline"
          onClick={() => navigate("/admin/alunos")}
        >
          Voltar
        </button>
        <button
          className="btn btn-purple"
          onClick={() =>
            navigate(`/admin/alunos/editar/${encodeURIComponent(id)}`)
          }
        >
          Editar Aluno
        </button>
      </div>
    </div>
  );
}
