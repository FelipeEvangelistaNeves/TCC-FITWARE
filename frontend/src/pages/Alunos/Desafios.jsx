import React, { useEffect, useState } from "react";
import "../../styles/pages/aluno/desafios.scss";

export default function DesafiosAluno() {
  const [remainingDays, setRemainingDays] = useState({
    desafio7dias: 2, // tempo inicial em dias
    desafioNutricao: 7,
  });

  useEffect(() => {
    // Atualiza a cada 24h (86400000 ms)
    const timer = setInterval(() => {
      setRemainingDays((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          if (updated[key] > 0) updated[key] -= 1;
        });
        return updated;
      });
    }, 86400000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="challenges-container">
      {/* cards de resumo */}
      <section className="summary-cards">
        <div className="summary-card">
          <h3>Ativos</h3>
          <div className="card-number">3</div>
          <div className="card-subtitle">hh</div>
        </div>
        <div className="summary-card">
          <h3>Concluídos</h3>
          <div className="card-number">12</div>
          <h3>Total</h3>
        </div>
        <div className="summary-card">
          <h3>Pontos</h3>
          <div className="card-number">850</div>
          <h3>Ranking #5</h3>
        </div>
      </section>

      <h4 className="section-title">Desafios Ativos</h4>

      {/* grid dos cards no desktop */}
      <div className="challenges-grid">
        {/* === Desafio 7 Dias === */}
        <div className="challenge-card">
          <div className="header">
            <div>
              <div className="name">Desafio 7 Dias</div>
              <div className="sub">5 de 7 dias completados</div>
            </div>
            <span className="status purple">Em andamento</span>
          </div>

          <div className="progressbar">
            <div className="fill" style={{ width: "71%" }} />
          </div>

          <div className="row-info">
            <span>Progresso: 71%</span>
            <span>
              {remainingDays.desafio7dias > 0
                ? `${remainingDays.desafio7dias} dias restantes`
                : "Concluído 🎉"}
            </span>
          </div>

          <div className="footer">
            <div className="reward">🏆 Recompensa: 200 pontos</div>
            <button className="action">Continuar</button>
          </div>
        </div>

        {/* === Desafio Nutrição === */}
        <div className="challenge-card">
          <div className="header">
            <div>
              <div className="name">Desafio Nutrição</div>
              <div className="sub">3 de 10 refeições registradas</div>
            </div>
            <span className="status blue">Em andamento</span>
          </div>

          <div className="progressbar">
            <div className="fill" style={{ width: "30%" }} />
          </div>

          <div className="row-info">
            <span>Progresso: 30%</span>
            <span>
              {remainingDays.desafioNutricao > 0
                ? `${remainingDays.desafioNutricao} dias restantes`
                : "Concluído 🎉"}
            </span>
          </div>

          <div className="footer">
            <div className="reward">🏆 Recompensa: 150 pontos</div>
            <button className="action">Registrar</button>
          </div>
        </div>

        {/* === Desafios Disponíveis === */}
        <div className="challenges-available">
          <h3>Desafios Disponíveis</h3>

          <div className="challenge-card">
            <h4>Desafio Funcional</h4>
            <p className="challenge-subtitle">
              5 treinos funcionais em 14 dias
            </p>
            <p className="challenge-description">
              Complete 5 treinos funcionais em 14 dias para melhorar sua
              resistência e ganhar pontos exclusivos.
            </p>
            <div className="challenge-footer">
              <span className="reward">🏅 Recompensa: 300 pontos</span>
              <button className="challenge-button">Iniciar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
