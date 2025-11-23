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

    fetchAlunos();
  }, []);

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
      </div>

      {/* CONTEÚDO */}
      <div className="perfil-content">
        {/* ABA: HISTÓRICO */}
        {abaAtiva === "historico" && (
          <div className="tab-section">
            <div className="historico-cards">
              {[
                {
                  tr_nome: "Treino de Pernas",
                  titulo: "Treino de Pernas",
                  tr_descricao: "45 minutos com agachamentos e leg press.",
                  descricao: "45 minutos com agachamentos e leg press.",
                  tr_categoria: "Hipertrofia",
                  data: "Hoje",
                  pontos: "+50",
                  Funcionario: {
                    fu_nome: "Carlos Silva",
                    fu_especialidade: "Musculação",
                  },
                  Exercicios: [
                    {
                      ex_id: 1,
                      ex_nome: "Agachamento Livre",
                      ex_repeticoes: "12",
                      ex_series: "4",
                    },
                    {
                      ex_id: 2,
                      ex_nome: "Leg Press 45",
                      ex_repeticoes: "15",
                      ex_series: "3",
                    },
                  ],
                },
                {
                  tr_nome: "Cardio",
                  titulo: "Cardio",
                  tr_descricao: "30 minutos de esteira e corrida leve.",
                  descricao: "30 minutos de esteira e corrida leve.",
                  tr_categoria: "Resistência",
                  data: "Ontem",
                  pontos: "+40",
                  Funcionario: {
                    fu_nome: "Ana Lima",
                    fu_especialidade: "Cardio",
                  },
                  Exercicios: [
                    {
                      ex_id: 3,
                      ex_nome: "Esteira",
                      ex_repeticoes: "30 min",
                      ex_series: "1",
                    },
                  ],
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
                    <button
                      className="btn-detalhes"
                      onClick={() => setTreinoSelecionado(treino)}
                    >
                      Detalhes
                    </button>
                  </div>
                </div>
              ))}
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
      </div>

      {modalAberto && (
        <ResgatePontosModal onClose={() => setModalAberto(false)} />
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
