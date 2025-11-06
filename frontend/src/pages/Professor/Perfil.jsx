import React, { useState, useEffect } from "react";
import "../../styles/pages/professor/perfilprof.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import ConfigProf from "../../components/Professor/configProf";

export default function PerfilProf() {
  const [professor, setProfessor] = useState([]);
  const [iniciais, setIniciais] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cref, setCref] = useState("");

  const [showConfigProf, setShowConfigProf] = useState(false);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const res = await fetch("http://localhost:3000/professor/fetch", {
          method: "GET",
          credentials: "include", // envia cookie JWT automaticamente
          headers: {
            Accept: "application/json; charset=utf-8",
          },
        });

        console.log("📥 Resposta recebida:", res.status);

        if (!res.ok) {
          throw new Error("Erro ao buscar dados do professor");
        }

        const data = await res.json();

        // Atualiza os estados com as informações retornadas
        setProfessor(data.professor);
        setIniciais(data.iniciais);

        setNome(data.professor.nome);
        setEmail(data.professor.email);
        setCargo(data.professor.cargo);
        setTelefone(data.professor.telefone);
        setCref(data.professor.cref);
      } catch (error) {
        console.error("Erro ao carregar dados do professor:", error);
      }
    };

    fetchProfessor();
  }, []);

  return (
    <div className="perfil-container roxo">
      {/* Cabeçalho */}
      <div className="perfil-header">
        <h2></h2>
        <i
          className="bi bi-gear"
          onClick={() => setShowConfigProf(true)}
          style={{ cursor: "pointer", fontSize: "1.5rem" }}
        ></i>

        <ConfigProf
          isOpen={showConfigProf}
          onClose={() => setShowConfigProf(false)}
        />
      </div>

      {/* Informações principais */}
      <div className="perfil-info">
        <div className="perfil-avatar">{iniciais}</div>
        <h3>{nome}</h3>
        <p>Personal Trainer</p>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">42</span>
            <span className="stat-label">Alunos</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">156</span>
            <span className="stat-label">Treinos</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">89</span>
            <span className="stat-label">Mensagens</span>
          </div>
        </div>
      </div>

      {/* Conteúdo do Perfil */}
      <div className="perfil-content">
        {/* Informações Pessoais */}
        <div className="card perfil-card">
          <div className="card-header-between">
            <h4>Informações Pessoais</h4>
            <i className="bi bi-pencil"></i>
          </div>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Telefone</span>
              <span className="info-value">{telefone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Especialidades</span>
              <div className="especialidades">
                <span className="tag">Musculação</span>
                <span className="tag">Funcional</span>
                <span className="tag">Cardio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Atividade Recente */}
        <div className="card perfil-card">
          <div className="card-header-between">
            <h4>Atividade Recente</h4>
            <i className="bi bi-clock-history"></i>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-title">
                <i className="bi bi-send"></i> Treino enviado para Maria Silva
              </div>
              <div className="activity-time">Hoje, 10:30</div>
            </div>
            <div className="activity-item">
              <div className="activity-title">
                <i className="bi bi-chat-dots"></i> Mensagem para Turma Segunda
              </div>
              <div className="activity-time">Hoje, 09:15</div>
            </div>
            <div className="activity-item">
              <div className="activity-title">
                <i className="bi bi-person-plus"></i> Novo aluno: Carlos Mendes
              </div>
              <div className="activity-time">Ontem, 16:45</div>
            </div>
          </div>
        </div>

        {/* Certificações */}
        <div className="card perfil-card">
          <div className="card-header-between">
            <h4>Certificações</h4>
            <a href="#">Ver Todas</a>
          </div>
          <div className="cert-list">
            <div className="cert-item">
              <i className="bi bi-award"></i>
              <div>
                <p className="cert-titulo">
                  CREF - Conselho Regional de Educação Física
                </p>
                <p className="cert-detalhe">{cref}</p>
              </div>
            </div>
            <div className="cert-item">
              <i className="bi bi-mortarboard"></i>
              <div>
                <p className="cert-titulo">
                  Especialização em Treinamento Funcional
                </p>
                <p className="cert-detalhe">Universidade do Esporte - 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
