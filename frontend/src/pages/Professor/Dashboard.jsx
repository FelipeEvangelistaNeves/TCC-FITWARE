import React from "react";
import "../../styles/pages/professor/dashboardProf.scss";
import { Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardProf() {
  const navigate = useNavigate();

  const atividades = [
  {
    id: 1,
    tipo: "Treino enviado para Maria",
    horario: "Hoje, 14:30",
  },
  {
    id: 2,
    tipo: "Mensagem para Turma Segunda",
    horario: "Hoje, 10:15",
  },
  {
    id: 3,
    tipo: "Novo aluno: Carlos Mendes",
    horario: "Ontem, 16:45",
  },
];


  return (
    <div className="dashboard-aluno">
      {/* Summary Cards */}
      <section className="summary-cards">
        <div className="summary-card">
          <h3>Treinos</h3>
          <div className="card-number">12</div>
          <div className="card-subtitle">Completos</div>
        </div>
        <div className="summary-card">
          <h3>Desafios</h3>
          <div className="card-number">3</div>
          <div className="card-subtitle">Ativos</div>
        </div>
        <div className="summary-card">
          <h3>Calorias</h3>
          <div className="card-number">450</div>
          <div className="card-subtitle">Hoje</div>
        </div>
      </section>

      {/* quick actions */}
      <section className="quick-actions">
        <h2>Ações Rápidas</h2>
          <div className="actions-grid">
            <button className="action-card" onClick={() => navigate('/professor/alunos')} >
                <div>
                  <i class="bi bi-person"></i>
                </div>
                <div className="action-label">Alunos</div>
            </button>

            <button className="action-card" onClick={() => navigate('/professor/treinos')} >
              <div>
                <Dumbbell size={22} />
              </div>
              <div className="action-label">Treinos</div>
            </button>

            <button className="action-card" onClick={() => navigate('/professor/mensagens')} >
              <div>
                <i class="bi bi-chat-left-text"></i>
              </div>
              <div className="action-label">Mensagens</div>
            </button>

            <button className="action-card" onClick={() => navigate('/professor/perfil')} >
              <div>
                <i class="bi bi-clock"></i>
              </div>
              <div className="action-label">Histórico</div>
            </button>
          </div>
      </section>

    <div className="atividade-card">
      <div className="atividade-header">
        <h3>Atividade Recente</h3>
      </div>

      <ul className="atividade-lista">
        {atividades.map((item) => (
          <li key={item.id} className="atividade-item">
            <div className="atividade-icone">{item.icon}</div>
            <div className="atividade-info">
              <p className="atividade-titulo">{item.tipo}</p>
              <span className="atividade-horario">{item.horario}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>

    </div>
  );
}