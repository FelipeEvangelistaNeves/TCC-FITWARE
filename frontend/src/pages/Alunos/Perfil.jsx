import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/perfilaluno.scss";
import ResgatePontosModal from "./ResgatePontosModal";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function PerfilAluno() {
  const [abaAtiva, setAbaAtiva] = useState("historico");
  const [modalAberto, setModalAberto] = useState(false);

  const getAbaCor = () => {
    switch (abaAtiva) {
      case "historico":
        return "roxo";
      case "pagamento":
        return "verde";
      case "pontos":
        return "amarelo";
      default:
        return "";
    }
  };

  const getTextoBotao = () => {
    if (abaAtiva === "pagamento") return "Plano Premium";
    return "850 Pontos";
  };

  const [nome, setNome] = useState("");
  const [iniciais, setIniciais] = useState("");

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/alunos", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json; charset=utf-8",
          },
        });
        if (!res.ok) throw new Error("Erro ao buscar dados do aluno");

        const data = await res.json();
        setNome(data.nome);
        setIniciais(data.iniciais);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlunos();
  }, []); // executa apenas 1x ao montar o componente
  return (
    <div className={`perfil-container ${getAbaCor()}`}>
      <div className="perfil-header">
        <h2>Meu Perfil</h2>
        <i className="bi bi-gear"></i>
      </div>

      <div className="perfil-info">
        <div className="perfil-avatar">{iniciais}</div>
        <h3>{nome}</h3>
        <p>Turma Segunda • 3 meses</p>
        <button
          className={`plano-btn ${
            abaAtiva === "pagamento" ? "premium" : "pontos"
          }`}
        >
          {getTextoBotao()}
        </button>
        <div className="pontos-header">
          <div className="pontos-info">
            <p>Nível Prata • Ranking #5</p>
          </div>
        </div>
      </div>

      {/* Abas */}
      <div className="perfil-tabs">
        <button
          className={abaAtiva === "historico" ? "active" : ""}
          onClick={() => setAbaAtiva("historico")}
        >
          Histórico
        </button>
        <button
          className={abaAtiva === "pagamento" ? "active" : ""}
          onClick={() => setAbaAtiva("pagamento")}
        >
          Pagamento
        </button>
        <button
          className={abaAtiva === "pontos" ? "active" : ""}
          onClick={() => setAbaAtiva("pontos")}
        >
          Pontos
        </button>
      </div>

      <div className="perfil-content">
        {/* Aba Histórico */}
        {abaAtiva === "historico" && (
          <div className="tab-section">
            <div className="historico-cards">
              {[
                {
                  titulo: "Treino de Força",
                  descricao: "Foco em membros inferiores — 45 minutos.",
                  data: "Hoje",
                  pontos: "+50 pts",
                },
                {
                  titulo: "Cardio Intenso",
                  descricao: "Corrida leve e esteira — 30 minutos.",
                  data: "Ontem",
                  pontos: "+40 pts",
                },
                {
                  titulo: "Treino de Core",
                  descricao: "Exercícios abdominais e prancha — 20 minutos.",
                  data: "2 dias atrás",
                  pontos: "+30 pts",
                },
              ].map((treino, i) => (
                <div className="card-treino" key={i}>
                  <div className="card-titulo">
                    <span>{treino.titulo}</span>
                    <span className="pontos-amarelo">
                      <i className="bi bi-lightning-charge"></i> {treino.pontos}
                    </span>
                  </div>
                  <p className="descricao">{treino.descricao}</p>
                  <div className="info-treino">
                    <span>
                      <i className="bi bi-clock"></i> {treino.data}
                    </span>
                    <button className="btn-detalhes">Detalhes</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão resgatar também no histórico */}
            <button
              className="btn-resgatar"
              onClick={() => setModalAberto(true)}
            >
              <i className="bi bi-gift"></i> Resgatar Pontos
            </button>
          </div>
        )}

        {/* Aba Pagamento */}
        {abaAtiva === "pagamento" && (
          <div className="tab-section">
            <div className="card-section">
              <div className="card">
                <div className="card-header-between">
                  <span>mensalidade</span>
                  <span className="status pago">paga</span>
                </div>
                <p>
                  Valor: <strong>R$ 99,90/mês</strong>
                </p>
                <p>
                  Próximo pagamento: <strong>15/06/2025</strong>
                </p>
                <p>
                  Método: <i className="bi bi-credit-card"></i> Mercado Pago
                </p>
              </div>

              <div className="card">
                <h4>Método de Pagamento</h4>
                <div className="metodo">
                  <i className="bi bi-credit-card"></i>
                  <div>
                    <p>Mercado Pago</p>
                    <small>Conta: maria.silva@email.com</small>
                  </div>
                  <span className="padrao">Padrão</span>
                </div>
                <button className="btn-adicionar">
                  <i className="bi bi-plus-lg"></i> Adicionar Novo Método
                </button>
              </div>

              <div className="card">
                <div className="card-header-between">
                  <h4>Últimos Pagamentos</h4>
                  <a href="#">Ver Todos</a>
                </div>
                <p>
                  mensalidade • 15/05/2025{" "}
                  <span className="valor">R$ 99,90</span>
                </p>
              </div>

              <button className="btn-cancelar">
                <i className="bi bi-x-circle"></i> Cancelar Assinatura
              </button>
            </div>
          </div>
        )}

        {/* Aba Pontos */}
        {abaAtiva === "pontos" && (
          <div className="tab-section">
            <div className="nivel-card">
              <div className="nivel-header">
                <span>Nível Prata</span>
                <span>850/1000</span>
              </div>
              <div className="progress">
                <div className="progress-bar"></div>
              </div>
              <small>150 pontos para o nível Ouro</small>
            </div>

            <div className="historico-pontos">
              <h4>Histórico de Pontos</h4>
              <div className="card">
                <div className="card-header-between">
                  <span>Treino de Força</span>
                  <span className="pontos">+50</span>
                </div>
                <p>
                  Hoje • Treino completo com todos os exercícios realizados.
                </p>
              </div>

              <div className="card">
                <div className="card-header-between">
                  <span>Treino de Cardio</span>
                  <span className="pontos">+40</span>
                </div>
                <p>
                  Ontem • Treino completo com todos os exercícios realizados.
                </p>
              </div>

              <div className="card">
                <div className="card-header-between">
                  <span>Desafio 7 Dias</span>
                  <span className="pontos">+100</span>
                </div>
                <p>
                  3 dias atrás • Completou 5 dias do desafio de 7 dias
                  consecutivos.
                </p>
              </div>
            </div>

            <button
              className="btn-resgatar"
              onClick={() => setModalAberto(true)}
            >
              <i className="bi bi-gift"></i> Resgatar Pontos
            </button>
          </div>
        )}
      </div>

      {modalAberto && (
        <ResgatePontosModal onClose={() => setModalAberto(false)} />
      )}
    </div>
  );
}
