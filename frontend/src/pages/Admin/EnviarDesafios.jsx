import React, { useState } from "react";
import "../../styles/pages/admin/forms.scss";

export default function EnviarDesafio() {
  const [destino, setDestino] = useState("todos");
  const [turma, setTurma] = useState("");
  const [confirmado, setConfirmado] = useState(false);

  const handleEnviar = () => {
    setConfirmado(true);
    setTimeout(() => {
      alert("✅ Desafio enviado com sucesso!");
      window.history.back();
    }, 1500);
  };

  return (
    <div className="form-page">
      <h2>Enviar Desafio</h2>
      <p className="text-muted mb-4">
        Escolha como o desafio será enviado para os alunos.
      </p>

      <div className="form-group">
        <label>Destino</label>
        <div className="options">
          <label>
            <input
              type="radio"
              value="todos"
              checked={destino === "todos"}
              onChange={() => setDestino("todos")}
            />
            Enviar para todos os alunos
          </label>
          <label>
            <input
              type="radio"
              value="turma"
              checked={destino === "turma"}
              onChange={() => setDestino("turma")}
            />
            Enviar para turma específica
          </label>
        </div>
      </div>

      {destino === "turma" && (
        <div className="form-group">
          <label>Selecione a turma</label>
          <select value={turma} onChange={(e) => setTurma(e.target.value)}>
            <option value="">Escolha uma turma...</option>
            <option value="Funcional">Funcional</option>
            <option value="Cardio">Cardio</option>
            <option value="Força">Força</option>
            <option value="Yoga">Yoga</option>
          </select>
        </div>
      )}

      <div className="actions">
        <button
          className="btn btn-outline"
          onClick={() => window.history.back()}
        >
          Cancelar
        </button>
        <button
          className="btn btn-purple"
          onClick={handleEnviar}
          disabled={destino === "turma" && !turma}
        >
          {confirmado ? "Enviando..." : "Enviar Desafio"}
        </button>
      </div>
    </div>
  );
}
