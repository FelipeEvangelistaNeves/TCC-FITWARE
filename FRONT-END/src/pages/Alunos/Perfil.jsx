import React, { useState } from "react";
import "../../styles/pages/aluno/perfilaluno.scss";
import "../../styles/pages/professor/perfilprof.scss";

export default function PerfilAluno() {
  const [tab, setTab] = useState("historico");

  return (
    <div className="perfil-content">
      {/* ===== Header fixo (parte de cima) ===== */}
      <div className="perfil-info">
        <div className="perfil-avatar">MS</div>
        <h2 className="nome">Maria Silva</h2>
        <p className="sub">Turma Segunda • 3 meses</p>

        <div className="pontos-info">
          <span className="badge pontos">
            {tab === "pagamentos" ? "Plano Premium" : "850 pontos"}
          </span>
          <div className="sub-info">
            {tab === "pagamentos" ? "Ativo • Renova 15/06/2025" : "Nível Prata • Ranking #5"}
          </div>
        </div>
      </div>

      {/* ===== Tabs ===== */}
      <div className="perfil-tabs">
        <button
          className={`tab-btn purple ${tab === "historico" ? "active" : ""}`}
          onClick={() => setTab("historico")}
        >
          Histórico
        </button>

        <button
          className={`tab-btn green ${tab === "pagamentos" ? "active" : ""}`}
          onClick={() => setTab("pagamentos")}
        >
          Pagamentos
        </button>

        <button
          className={`tab-btn yellow ${tab === "pontos" ? "active" : ""}`}
          onClick={() => setTab("pontos")}
        >
          Pontos
        </button>
      </div>

      {/* ===== Conteúdo das abas (switch) ===== */}
      <div className="tab-content">
        {tab === "historico" && (
          <div className="historico-tab">
            <div className="card">
              <h4>
                Treino de Força
                <span className="pontos">+50</span>
              </h4>

              <ul className="exercises">
                <li>Agachamento: 3×12</li>
                <li>Supino: 3×10</li>
                <li>Remada: 3×10</li>
              </ul>

              <div className="bottom-card">
                <span className="tempo">45 minutos</span>
                <button className="btn-detalhes">Ver Detalhes</button>
              </div>
            </div>

            <div className="card">
              <h4>
                Treino de Cardio
                <span className="pontos">+40</span>
              </h4>

              <ul className="exercises">
                <li>Corrida: 20 min</li>
                <li>Pular corda: 10 min</li>
                <li>Bicicleta: 15 min</li>
              </ul>

              <div className="bottom-card">
                <span className="tempo">45 minutos</span>
                <button className="btn-detalhes btn-blue">Ver Detalhes</button>
              </div>
            </div>

            <button className="btn-resgatar">Resgatar Pontos</button>
          </div>
        )}

        {tab === "pagamentos" && (
          <div className="pagamentos-tab">
            <div className="card">
              <h4>
                mensalidade <span className="status pago">paga</span>
              </h4>

              <p>
                <strong>Valor:</strong> R$ 99,90/mês
                <br />
                <strong>Próximo pagamento:</strong> 15/06/2025
                <br />
                <strong>Método:</strong> <span className="destaque">Mercado Pago</span>
              </p>
            </div>

            <div className="card">
              <h4>Método de Pagamento</h4>

              <div className="method-row">
                <div className="method-left">
                  <div className="method-icon">💳</div>
                  <div className="method-info">
                    <div className="method-name">Mercado Pago</div>
                    <div className="method-sub">Conta: maria.silva@email.com</div>
                  </div>
                </div>

                <div className="method-right">
                  <span className="badge padrao">Padrão</span>
                </div>
              </div>

              <button className="btn-outline">+ Adicionar Novo Método</button>
            </div>

            <div className="card">
              <h4>
                Últimos Pagamentos <span className="ver-todos">Ver Todos</span>
              </h4>

              <p>
                mensalidade
                <br />
                <span className="sub">15/05/2025</span>
                <span className="valor">R$ 99,90</span>
              </p>
            </div>

            <div className="cancel-wrap">
              <button className="btn-cancelar">Cancelar Assinatura</button>
            </div>
          </div>
        )}

        {tab === "pontos" && (
          <div className="pontos-tab">
            <div className="nivel-card">
              <h4>
                Nível Prata <span className="badge nivel">850/1000</span>
              </h4>

              <div className="progress">
                <div className="progress-bar" style={{ width: "85%" }} />
              </div>

              <div className="next-level">150 pontos para o nível Ouro</div>
            </div>

            <div className="pontos-historico">
              <h5>Histórico de Pontos</h5>

              <div className="ponto-card">
                <h6>Treino de Força</h6>
                <div className="data">Hoje</div>
                <div className="descricao">Treino completo com todos os exercícios realizados.</div>
                <span className="pontos">+50</span>
              </div>

              <div className="ponto-card">
                <h6>Treino de Cardio</h6>
                <div className="data">Ontem</div>
                <div className="descricao">Treino completo com todos os exercícios realizados.</div>
                <span className="pontos">+40</span>
              </div>

              <div className="ponto-card">
                <h6>Desafio 7 Dias</h6>
                <div className="data">3 dias atrás</div>
                <div className="descricao">Completou 5 dias do desafio de 7 dias consecutivos.</div>
                <span className="pontos">+100</span>
              </div>
            </div>

            <button className="btn-resgatar">Resgatar Pontos</button>
          </div>
        )}
      </div>
    </div>
  );
}
