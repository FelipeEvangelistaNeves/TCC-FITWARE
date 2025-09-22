import React, { useState } from "react";
import "../../styles/pages/aluno/perfil.scss";

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

            <button className="btn-resgatar">Resgatar Pontos</button>
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
              <p>Conta: maria.silva@email.com</p>
              <button className="btn-outline">+ Adicionar Novo Método</button>
            </div>

            <div className="card">
              <h4>Últimos Pagamentos <span className="ver-todos">Ver Todos</span></h4>
              <p>mensalidade - <span className="valor">R$ 99,90</span></p>
            </div>

            <button className="btn-cancelar">Cancelar Assinatura</button>
          </div>
        );

      case "pontos":
        return (
          <div className="pontos-tab">
            <div className="nivel-card">
              <h4>
                Nível Prata <span className="badge">850/1000</span>
              </h4>
              <div className="progress">
                <div className="progress-bar" style={{ width: "85%" }}></div>
              </div>
              <p className="next-level">150 pontos para o nível Ouro</p>
            </div>

            <div className="pontos-historico">
              <h5>Histórico de Pontos</h5>

              <div className="ponto-card">
                <h6>Treino de Força</h6>
                <p className="data">Hoje</p>
                <p className="descricao">Treino completo com todos os exercícios realizados.</p>
                <span className="pontos">+50</span>
              </div>

              <div className="ponto-card">
                <h6>Treino de Cardio</h6>
                <p className="data">Ontem</p>
                <p className="descricao">Treino completo com todos os exercícios realizados.</p>
                <span className="pontos">+40</span>
              </div>

              <div className="ponto-card">
                <h6>Desafio 7 Dias</h6>
                <p className="data">3 dias atrás</p>
                <p className="descricao">Completou 5 dias do desafio de 7 dias consecutivos.</p>
                <span className="pontos">+100</span>
              </div>
            </div>

            <button className="btn-resgatar">Resgatar Pontos</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="perfil-container">
      {/* Header fixo já existe fora daqui */}

      <div className="perfil-header">
        <div className="avatar">MS</div>
        <h2>Maria Silva</h2>
        <p>Turma Segunda • 3 meses</p>

        <div className="pontos-info">
          <span className="badge pontos">850 pontos</span>
          <p className="sub-info">Nível Prata • Ranking #5</p>
        </div>
      </div>

      {/* Abas */}
      <div className="perfil-tabs">
        <button
          className={`tab-btn ${activeTab === "historico" ? "active purple" : ""}`}
          onClick={() => setActiveTab("historico")}
        >
          Histórico
        </button>
        <button
          className={`tab-btn ${activeTab === "pagamentos" ? "active green" : ""}`}
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

      {/* Renderização condicional */}
      <div className="tab-content">{renderContent()}</div>
    </div>
  );
}
