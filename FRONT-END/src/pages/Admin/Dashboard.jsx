import { useEffect } from "react";
import Chart from "chart.js/auto";
import "../../styles/pages/admin/dashboard.scss";

export default function Dashboard() {
  useEffect(() => {
    const ctx = document.getElementById("activityChart").getContext("2d");
    const chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        datasets: [
          {
            label: "Atividade de Alunos",
            data: [12, 19, 14, 17, 22, 18, 25],
            borderColor: "#7f24c6",
            backgroundColor: "rgba(127, 36, 198, 0.2)",
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#ffffff",
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "#ffffff" },
            grid: { color: "rgba(255,255,255,0.1)" },
          },
          y: {
            ticks: { color: "#ffffff" },
            grid: { color: "rgba(255,255,255,0.1)" },
          },
        },
      },
    });

    // Cleanup: destrói o gráfico ao desmontar ou atualizar
    return () => {
      chartInstance.destroy();
    };
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Cards Superiores */}
      <div className="cards-grid">
        <div className="card">
          <span className="card-title">Total de Alunos</span>
          <span className="card-value">156</span>
          <span className="card-change positive">+12% este mês</span>
        </div>
        <div className="card">
          <span className="card-title">Treinos Enviados</span>
          <span className="card-value">432</span>
          <span className="card-change positive">+18% este mês</span>
        </div>
        <div className="card">
          <span className="card-title">Desafios Ativos</span>
          <span className="card-value">24</span>
          <span className="card-change negative">-3% este mês</span>
        </div>
        <div className="card">
          <span className="card-title">Pontos Resgatados</span>
          <span className="card-value">12.5k</span>
          <span className="card-change positive">+18% este mês</span>
        </div>
      </div>

      {/* Gráfico e Atividade */}
      <div className="content-grid">
        {/* Gráfico */}
        <div className="chart-section" style={{ height: "320px" }}>
          <h2 className="section-title">Atividade de Alunos</h2>
          <canvas id="activityChart"></canvas>
        </div>

        {/* Atividade Recente */}
        <div className="activity-section">
          <div className="section-header">
            <h2 className="section-title">Atividade Recente</h2>
            <a href="#">Ver Tudo</a>
          </div>
          <ul className="activity-list">
            <li className="activity-item">
              <div className="avatar" style={{ background: "#5A67D8" }}>
                MS
              </div>
              <div className="activity-info">
                <span className="name">
                  Maria Silva completou o treino de força
                </span>
                <span className="time">Hoje, 14:30</span>
              </div>
            </li>
            <li className="activity-item">
              <div className="avatar" style={{ background: "#48BB78" }}>
                PA
              </div>
              <div className="activity-info">
                <span className="name">
                  Pedro Alves resgatou pontos por uma consulta
                </span>
                <span className="time">Hoje, 12:15</span>
              </div>
            </li>
            <li className="activity-item">
              <div className="avatar" style={{ background: "#F6AD55" }}>
                CM
              </div>
              <div className="activity-info">
                <span className="name">
                  Carlos Mendes iniciou o desafio de 7 dias
                </span>
                <span className="time">Ontem, 18:45</span>
              </div>
            </li>
            <li className="activity-item">
              <div className="avatar" style={{ background: "#FC8181" }}>
                AS
              </div>
              <div className="activity-info">
                <span className="name">
                  Ana Santos completou o desafio de nutrição
                </span>
                <span className="time">Ontem, 10:20</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
