import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/professor/perfilprof.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import ConfigProf from "../../components/Professor/configProf";
import HistAtiv from "../../components/Professor/HistAtiv";

export default function PerfilProf() {
  const navigate = useNavigate();
  const [iniciais, setIniciais] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cref, setCref] = useState("");

  const [showConfigProf, setShowConfigProf] = useState(false);

  // Estado modal certificações
  const [showCertModal, setShowCertModal] = useState(false);

  // Estado modal histórico atividades
  const [showHistorico, setShowHistorico] = useState(false);

  // Estados para estatísticas dinâmicas
  const [totalAlunos, setTotalAlunos] = useState(0);
  const [totalTreinos, setTotalTreinos] = useState(0);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/professor/me`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json; charset=utf-8",
            },
          }
        );

        if (!res.ok) throw new Error("Erro ao buscar dados do professor");

        const data = await res.json();

        setIniciais(data.iniciais);
        setNome(data.nome);
        setEmail(data.email);
        setCargo(data.cargo);
        setTelefone(data.telefone);
        setCref(data.cref);
      } catch (error) {
        console.error("Erro ao carregar dados do professor:", error);
      }
    };

    const fetchEstatisticas = async () => {
      try {
        // Buscar total de alunos
        const resAlunos = await fetch(
          `${import.meta.env.VITE_BASE_URL}/professor/allAlunos`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json; charset=utf-8",
            },
          }
        );

        if (resAlunos.ok) {
          const dataAlunos = await resAlunos.json();
          setTotalAlunos(dataAlunos.alunos?.length || 0);
        }

        // Buscar total de treinos
        const resDashboard = await fetch(
          `${import.meta.env.VITE_BASE_URL}/professor/dashboard`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json; charset=utf-8",
            },
          }
        );

        if (resDashboard.ok) {
          const dataDashboard = await resDashboard.json();
          setTotalTreinos(dataDashboard.totalTreinos || 0);
        }
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      }
    };

    fetchProfessor();
    fetchEstatisticas();
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
          <div
            className="stat-item stat-button"
            onClick={() => navigate("/professor/alunos")}
          >
            <span className="stat-number">{totalAlunos}</span>
            <span className="stat-label">Alunos</span>
          </div>
          <div
            className="stat-item stat-button"
            onClick={() => navigate("/professor/treinos")}
          >
            <span className="stat-number">{totalTreinos}</span>
            <span className="stat-label">Treinos</span>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="perfil-content">
        {/* Informações pessoais */}
        <div className="card perfil-card">
          <div className="card-header-between">
            <h4>Informações Pessoais</h4>
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

        {/* Certificações */}
        <div className="card perfil-card">
          <div className="card-header-between">
            <h4>Certificações</h4>

            <button
              className="ver-todas-btn"
              onClick={() => setShowCertModal(true)}
            >
              Ver Todas
            </button>
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
          </div>
        </div>
      </div>

      {/* MODAL CERTIFICAÇÕES */}
      {showCertModal && (
        <div
          className="cert-modal-overlay"
          onClick={() => setShowCertModal(false)}
        >
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cert-modal-header">
              <h4>Certificações</h4>
              <span
                className="close-btn"
                onClick={() => setShowCertModal(false)}
              >
                &times;
              </span>
            </div>

            <div className="cert-modal-body">
              <div className="cert-modal-item">
                <i className="bi bi-award"></i>
                <div>
                  <h5>CREF - Conselho Regional de Educação Física</h5>
                  <p>{cref}</p>
                </div>
              </div>

              <div className="cert-modal-item">
                <i className="bi bi-mortarboard"></i>
                <div>
                  <h5>Especialização em Treinamento Funcional</h5>
                  <p>Universidade do Esporte — 2020</p>
                </div>
              </div>
            </div>

            <button
              className="close-footer-btn"
              onClick={() => setShowCertModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
