import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/pages/admin/financeirodetalhe.scss";

export default function FinanceiroDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [pagamento, setPagamento] = useState({
    id,
    usuario: "Maria Silva",
    valor: "R$ 149,90",
    data: "15/05/2023",
    status: "Pago",
    metodo: "Cartão de Crédito",
    descricao:
      "Pagamento referente à mensalidade do plano funcional de maio de 2023.",
  });

  const handleChange = (field, value) => {
    setPagamento({ ...pagamento, [field]: value });
  };

  const handleSave = () => {
    alert("Pagamento atualizado com sucesso!");
    setIsEditing(false);
  };

  return (
    <div className="detalhes-pagamento">
      <h2>Detalhes do Pagamento</h2>

      <div className="info-grid">
        <div>
          <strong>ID:</strong> {pagamento.id}
        </div>
        <div>
          <strong>Usuário:</strong>{" "}
          {isEditing ? (
            <input
              value={pagamento.usuario}
              onChange={(e) => handleChange("usuario", e.target.value)}
            />
          ) : (
            pagamento.usuario
          )}
        </div>
        <div>
          <strong>Valor:</strong>{" "}
          {isEditing ? (
            <input
              value={pagamento.valor}
              onChange={(e) => handleChange("valor", e.target.value)}
            />
          ) : (
            pagamento.valor
          )}
        </div>
        <div>
          <strong>Data:</strong>{" "}
          {isEditing ? (
            <input
              value={pagamento.data}
              onChange={(e) => handleChange("data", e.target.value)}
            />
          ) : (
            pagamento.data
          )}
        </div>
        <div>
          <strong>Status:</strong>{" "}
          {isEditing ? (
            <select
              value={pagamento.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option>Pago</option>
              <option>Pendente</option>
              <option>Cancelado</option>
            </select>
          ) : (
            <span className={`status ${pagamento.status.toLowerCase()}`}>
              {pagamento.status}
            </span>
          )}
        </div>
        <div>
          <strong>Método:</strong>{" "}
          {isEditing ? (
            <input
              value={pagamento.metodo}
              onChange={(e) => handleChange("metodo", e.target.value)}
            />
          ) : (
            pagamento.metodo
          )}
        </div>
      </div>

      <h4>Descrição</h4>
      {isEditing ? (
        <textarea
          value={pagamento.descricao}
          onChange={(e) => handleChange("descricao", e.target.value)}
        />
      ) : (
        <p>{pagamento.descricao}</p>
      )}

      <div className="actions">
        {isEditing ? (
          <>
            <button
              className="btn btn-outline"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
            <button className="btn btn-purple" onClick={handleSave}>
              Salvar
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-outline" onClick={() => navigate(-1)}>
              Voltar
            </button>
            <button
              className="btn btn-purple"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
