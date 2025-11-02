import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/pages/admin/treinos.scss";

export default function ProfessorDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock temporário
  const professor = {
    id,
    nome: "Maria Souza",
    especialidade: "Treinos Funcionais",
    status: "Ativo",
    alunos: 28,
    aulas: 12,
    dataCadastro: "20/04/2024",
  };

  return (
    <div className="detalhes-treino">
      <h2>{professor.nome}</h2>
      <div className="info">
        <span>{professor.especialidade}</span> • <span>{professor.status}</span>
      </div>

      <p className="descricao">
        <strong>Data de Cadastro:</strong> {professor.dataCadastro}
        <br />
        <strong>Total de Alunos:</strong> {professor.alunos}
        <br />
        <strong>Total de Aulas Ministradas:</strong> {professor.aulas}
      </p>

      <div className="actions">
        <button
          className="btn btn-outline"
          onClick={() => navigate("/admin/professores")}
        >
          Voltar
        </button>
        <button
          className="btn btn-purple"
          onClick={() =>
            navigate(`/admin/professores/editar/${encodeURIComponent(id)}`)
          }
        >
          Editar Professor
        </button>
      </div>
    </div>
  );
}
