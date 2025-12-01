import React, { useMemo } from "react";
import "./../../styles/pages/aluno/desafios.scss";
import { FaTrophy } from "react-icons/fa";

export default function DesafioCard({
  titulo,
  descricao,
  pontos,
  progress,
  endDate,
  status,
  onEnviar,
  onAplicar,
  applied = false,
  applying = false,
}) {
  const pct = Number(progress) || 0;

  const formattedEndDate = useMemo(() => {
    if (!endDate) return null;
    try {
      const d = new Date(endDate);
      if (isNaN(d)) return endDate;
      return d.toLocaleDateString("pt-BR");
    } catch (e) {
      return endDate;
    }
  }, [endDate]);

  return (
    <div className={`desafio-card ${String(status).toLowerCase()}`}>
      <div className="desafio-header">
        <div className="titulo-wrapper">
          <FaTrophy className="trophy-icon" />
          <h3>{titulo}</h3>
        </div>
        <div style={{ textAlign: "right" }}>
          <span className="status-badge">
            {String(status).toLowerCase() === "ativo"
              ? "Em andamento"
              : String(status)}
          </span>
          {formattedEndDate && (
            <div
              className="end-date"
              style={{ fontSize: 12, color: "#666", marginTop: 6 }}
            >
              Fim: {formattedEndDate}
            </div>
          )}
        </div>
      </div>

      <p className="descricao">{descricao}</p>

      {/* Progress is per-aluno: show only when this aluno already applied */}
      {applied && (
        <div className="progress-wrapper" style={{ margin: "12px 0" }}>
          <input
            type="range"
            min="0"
            max="100"
            value={pct}
            disabled
            aria-label={`Progresso do desafio ${titulo}`}
            style={{ "--progress": `${pct}%` }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              marginTop: 6,
            }}
          >
            <span>{pct}% concluído</span>
            <span>{pontos} pontos</span>
          </div>
        </div>
      )}

      {applied ? (
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-enviar" onClick={onEnviar}>
            Enviar Comprovação
          </button>
        </div>
      ) : (
        <button
          className="btn-aplicar"
          onClick={onAplicar}
          disabled={applying}
        >
          {applying ? "Aplicando..." : "Aplicar"}
        </button>
      )}

      <div className="desafio-footer">
        {/* Footer kept minimal; slider now shows progress and points above */}
      </div>
    </div>
  );
}
