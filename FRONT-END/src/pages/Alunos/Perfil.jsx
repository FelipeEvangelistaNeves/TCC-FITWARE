import React, { useState } from "react";
import "../../styles/perfil.scss";

export default function PerfilAluno() {
  const [activeTab, setActiveTab] = useState("historico");
  const renderContent = () => {
    switch (activeTab) {
      case "historico":

        return (
          <div className="profile-content">
            <div className="profile-card">
              <div className="title">Treino de Força</div>
              <div className="subtitle">Hoje</div>
              <div className="details">
                • Agachamento: 3×12 <br />
                • Supino: 3×10 <br />
                • Remada: 3×10
              </div>
              <div className="actions">
                <span className="reward">+50</span>
                <button className="btn details">Ver Detalhes</button>
              </div>
            </div>

            <div className="profile-card">
              <div className="title">Treino de Cardio</div>
              <div className="subtitle">Ontem</div>
              <div className="details">
                • Corrida: 20 min <br />
                • Pular corda: 10 min <br />
                • Bicicleta: 15 min
              </div>
              <div className="actions">
                <span className="reward">+40</span>
                <button className="btn details blue">Ver Detalhes</button>
              </div>
            </div>
          </div>
        );
      case "pagamentos":
        return (
          <div className="profile-content">
            <div className="profile-card">
              <div className="title">Histórico de Pagamentos</div>
              <div className="details">
                • Mensalidade Janeiro: R$ 120,00 <br />
                • Mensalidade Fevereiro: R$ 120,00 <br />
                • Mensalidade Março: R$ 120,00
              </div>
            </div>
          </div>
        );
      case "pontos":
        return (
          <div className="profile-content">
            <div className="profile-card">
              <div className="title">Seus Pontos</div>
              <div className="details">
                Você acumulou <strong>850 pontos</strong> até agora. <br />
                Continue treinando para ganhar mais recompensas!
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      {/* Header do perfil */}
      <div className="profile-header">
        <div className="avatar">MS</div>
        <div className="name">Maria Silva</div>
        <div className="sub">Turma Segunda • 3 meses</div>
        <div className="points">850 pontos</div>
        <div className="meta">Nível Prata • Ranking #5</div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === "historico" ? "active" : ""}`}
          onClick={() => setActiveTab("historico")}
        >
          Histórico
        </button>
        <button
          className={`tab-btn ${
            activeTab === "pagamentos" ? "active green" : ""
          }`}
          onClick={() => setActiveTab("pagamentos")}
        >
          Pagamentos
        </button>
        <button
          className={`tab-btn ${activeTab === "pontos" ? "active yellow" : ""}`}
          onClick={() => setActiveTab("pontos")}
        >
          Pontos
        </button>
      </div>

      {/* Conteúdo dinâmico */}
      {renderContent()}

      {/* Botão fixo inferior */}
      <div className="profile-bottom-action">
        <button>🔄 Resgatar Pontos</button>
      </div>
    </div>
  );
}
