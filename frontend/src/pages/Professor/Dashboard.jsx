import React, { useEffect, useState, useRef } from "react";
import "../../styles/pages/professor/dashboardProf.scss";
import { Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardProf() {
  const navigate = useNavigate();

  const [totalTreinos, setTotalTreinos] = useState();
  const [totalTurmas, setTotalTurmas] = useState();
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/professor/dashboard`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Erro ao carregar dashboard");

        const data = await res.json();
        setTotalTreinos(data.totalTreinos);
        setTotalTurmas(data.totalTurmas);
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      }
    }

    fetchDashboard();
  }, []);

  useEffect(() => {
    async function fetchUltimosAvisos() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/professor/avisosRecent`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Erro ao buscar avisos");
        }

        const data = await res.json();

        setAvisos(data.avisos);
      } catch (err) {
        console.error("Erro ao buscar avisos:", err);
      }
    }

    fetchUltimosAvisos();
  }, []);

  return (
    <div className="dashboard-aluno">
      {/* Summary Cards */}
      <section className="summary-cards">
        <div className="summary-card">
          <h3>Treinos Criados</h3>
          <div className="card-number">{totalTreinos}</div>
          <div className="card-subtitle">Total</div>
        </div>

        <div className="summary-card">
          <h3>Turmas</h3>
          <div className="card-number">{totalTurmas}</div>
          <div className="card-subtitle">Ativas</div>
        </div>
      </section>

      {/* quick actions */}
      <section className="quick-actions">
        <h2>Ações Rápidas</h2>
        <div className="actions-grid">
          <button
            className="action-card"
            onClick={() => navigate("/professor/alunos")}
          >
            <div>
              <i className="bi bi-person"></i>
            </div>
            <div className="action-label">Alunos</div>
          </button>

          <button
            className="action-card"
            onClick={() => navigate("/professor/treinos")}
          >
            <div>
              <Dumbbell size={22} />
            </div>
            <div className="action-label">Treinos</div>
          </button>

          <button
            className="action-card"
            onClick={() => navigate("/professor/mensagens")}
          >
            <div>
              <i className="bi bi-chat-left-text"></i>
            </div>
            <div className="action-label">Mensagens</div>
          </button>

          <button
            className="action-card"
            onClick={() => navigate("/professor/perfil")}
          >
            <div>
              <i className="bi bi-clock"></i>
            </div>
            <div className="action-label">Perfil</div>
          </button>
        </div>
      </section>

      <section className="atividade-card">
        <div className="atividade-header">
          <h3>Alertas Importantes</h3>
        </div>

        <ul className="atividade-lista">
          {avisos.length === 0 && (
            <li className="atividade-item">Nenhum aviso recente.</li>
          )}

          {avisos.map((a) => (
            <li key={a.av_id} className="atividade-item">
              <div className="atividade-info">
                <p className="atividade-titulo">{a.av_titulo}</p>
                <span className="atividade-horario">
                  {new Date(a.av_data_criacao).toLocaleString("pt-BR")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
