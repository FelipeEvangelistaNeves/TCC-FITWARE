import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/pages/admin/treinos.scss";

export default function BrindeDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Exemplo de dados — simulando fetch
  const brinde = {
    id,
    nome: "Camiseta FitWare",
    pontos: 500,
    estoque: 45,
    status: "ativo",
    descricao:
      "Camiseta oficial FitWare em algodão premium. Tamanhos P, M e G.",
  };

  return (
    <div className="detalhes-treino">
      <h2>{brinde.nome}</h2>
      <p className="descricao">{brinde.descricao}</p>

      <div className="info">
        <p>
          <strong>ID:</strong> {brinde.id}
        </p>
        <p>
          <strong>Pontos:</strong> ⭐ {brinde.pontos}
        </p>
        <p>
          <strong>Estoque:</strong> {brinde.estoque} unidades
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {brinde.status === "ativo" ? "Ativo" : "Esgotado"}
        </p>
      </div>

      <div className="actions">
        <button
          className="btn btn-outline"
          onClick={() => navigate("/admin/brindes")}
        >
          Voltar
        </button>
        <button
          className="btn btn-purple"
          onClick={() =>
            navigate(`/admin/brindes/editar/${encodeURIComponent(id)}`)
          }
        >
          Editar Brinde
        </button>
      </div>
    </div>
  );
}
