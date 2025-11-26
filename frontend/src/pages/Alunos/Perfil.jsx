import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/perfilaluno.scss";
import ResgatePontosModal from "./ResgatePontosModal";
import DetalhesTreino from "../Professor/DetalhesTreino";
import ConfigModal from "../../components/Alunos/configModal";

export default function PerfilAluno() {
  const [nome, setNome] = useState("");
  const [iniciais, setIniciais] = useState("");
  const [pontos, setPontos] = useState(0);
  const [email, setEmail] = useState("");
  const [turma, setTurma] = useState("");

  const [abaAtiva, setAbaAtiva] = useState("historico");
  const [modalAberto, setModalAberto] = useState(false);
  const [treinoSelecionado, setTreinoSelecionado] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const [comprovantes, setComprovantes] = useState([]);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/aluno`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json; charset=utf-8",
          },
        });

        if (!res.ok) throw new Error("Erro ao buscar aluno");

        const data = await res.json();
        setNome(data.nome);
        setIniciais(data.iniciais);
        setPontos(data.pontos);
        setEmail(data.email);
        setTurma(data.turmas[0].tu_nome);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchComprovantes = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/produtos/meus-resgates`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setComprovantes(data || []);
        }
      } catch (error) {
        console.error("Erro ao buscar comprovantes:", error);
      }
    };

    const fetchHistorico = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/aluno/historico`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setHistorico(data || []);
        }
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
      }
    };

    fetchAlunos();
    fetchComprovantes();
    fetchHistorico();
  }, []);

  const handleResgateSucesso = () => {
    // Atualizar comprovantes quando um resgate é feito com sucesso
    const fetchComprovantes = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/produtos/meus-resgates`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setComprovantes(data || []);
        }
      } catch (error) {
        console.error("Erro ao buscar comprovantes:", error);
      }
    };

    fetchComprovantes();
  };

  return (
    <div className="perfil-container">
      {/* HEADER */}
      <div className="perfil-header">
        <h2></h2>
        <i className="bi bi-gear" onClick={() => setShowConfig(true)}></i>

        <ConfigModal isOpen={showConfig} onClose={() => setShowConfig(false)} />
      </div>

      {/* INFORMAÇÕES DO ALUNO */}
      <div className="perfil-info">
        <div className="perfil-avatar">{iniciais}</div>
        <h3>{nome}</h3>
        <p>{turma}</p>

        <button className="plano-btn pontos">{pontos} Pontos</button>
      </div>

      {/* ABAS */}
      <div className="perfil-tabs">
        <button
          className={abaAtiva === "historico" ? "active" : ""}
          onClick={() => setAbaAtiva("historico")}
        >
          Histórico
        </button>
        <button
          className={abaAtiva === "comprovantes" ? "active" : ""}
          onClick={() => setAbaAtiva("comprovantes")}
        >
          Comprovantes
        </button>
      </div>

      {/* CONTEÚDO */}
      <div className="perfil-content">
        {/* ABA: HISTÓRICO */}
        {abaAtiva === "historico" && (
          <div className="tab-section">
            <div className="historico-cards">
              {historico && historico.length > 0 ? (
                historico.map((item, i) => {
                  let icone = "bi-lightning-charge";
                  let acao = "";

                  if (item.tipo === "treino") {
                    icone = "bi-dumbbell";
                    acao = "Treino Realizado";
                  } else if (item.tipo === "desafio") {
                    icone = "bi-star";
                    acao = "Desafio Concluído";
                  } else if (item.tipo === "resgate") {
                    icone = "bi-gift";
                    acao = "Pontos Resgatados";
                  }

                  return (
                    <div className="card-treino" key={i}>
                      <div className="card-titulo">
                        <span>
                          <i className={`bi ${icone}`}></i> {item.titulo}
                        </span>
                        {item.tipo === "resgate" && (
                          <span className="pontos-amarelo">
                            <i className="bi bi-gift"></i> {acao}
                          </span>
                        )}
                      </div>
                      <p className="descricao">{item.descricao}</p>
                      <div className="info-treino">
                        <span>
                          <i className="bi bi-tag"></i> {item.tipo}
                        </span>
                        {item.professor && (
                          <span>
                            <i className="bi bi-person"></i> {item.professor}
                          </span>
                        )}
                        {item.hash && (
                          <span>
                            <i className="bi bi-hash"></i>{" "}
                            {item.hash.substring(0, 10)}...
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="sem-historico">
                  Nenhum item no seu histórico ainda.
                </p>
              )}
            </div>

            <button
              className="btn-resgatar"
              onClick={() => setModalAberto(true)}
            >
              <i className="bi bi-gift"></i> Resgatar Pontos
            </button>
          </div>
        )}

        {/* ABA: PONTOS */}
        {abaAtiva === "pontos" && (
          <div className="tab-section">
            <div className="historico-pontos">
              <h4>Histórico de Pontos</h4>

              <div className="card">
                <div className="card-header-between">
                  <span>Treino de Pernas</span>
                  <span className="pontos">+50</span>
                </div>
                <p>Hoje • Exercício completo.</p>
              </div>

              <div className="card">
                <div className="card-header-between">
                  <span>Cardio</span>
                  <span className="pontos">+40</span>
                </div>
                <p>Ontem • Treino realizado por completo.</p>
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

        {/* ABA: COMPROVANTES */}
        {abaAtiva === "comprovantes" && (
          <div className="tab-section">
            <div className="comprovantes-list">
              <h4>Comprovantes de Resgate</h4>

              {comprovantes && comprovantes.length > 0 ? (
                comprovantes.map((comp, i) => (
                  <div className="card-comprovante" key={i}>
                    <div className="comp-header">
                      <span className="comp-titulo">
                        <i className="bi bi-check-circle"></i>{" "}
                        {comp.Produto?.pd_nome || "Produto"}
                      </span>
                      <span className="comp-data">
                        {new Date(
                          comp.re_data || comp.createdAt
                        ).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <p className="comp-hash">
                      <strong>Hash:</strong> {comp.re_hash}
                    </p>
                    <p className="comp-status">
                      Status: <span className="status-ativo">✓ Confirmado</span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="sem-comprovantes">
                  Nenhum comprovante de resgate encontrado.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {modalAberto && (
        <ResgatePontosModal
          onClose={() => setModalAberto(false)}
          onResgateSucesso={handleResgateSucesso}
        />
      )}

      {treinoSelecionado && (
        <DetalhesTreino
          treino={treinoSelecionado}
          onClose={() => setTreinoSelecionado(null)}
        />
      )}
    </div>
  );
}
