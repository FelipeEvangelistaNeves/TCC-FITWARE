import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "../../styles/pages/admin/dashboard.scss";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  const atividades = [
    {
      id: 1,
      nome: "Maria Silva",
      acao: "completou o treino de força",
      hora: "Hoje, 14:30",
      cor: "#5A67D8",
      iniciais: "MS",
    },
    {
      id: 2,
      nome: "Pedro Alves",
      acao: "resgatou pontos por uma consulta",
      hora: "Hoje, 12:15",
      cor: "#48BB78",
      iniciais: "PA",
    },
    {
      id: 3,
      nome: "Carlos Mendes",
      acao: "iniciou o desafio de 7 dias",
      hora: "Ontem, 18:45",
      cor: "#F6AD55",
      iniciais: "CM",
    },
    {
      id: 4,
      nome: "Ana Santos",
      acao: "completou o desafio de nutrição",
      hora: "Ontem, 10:20",
      cor: "#FC8181",
      iniciais: "AS",
    },
    {
      id: 5,
      nome: "Lucas Pereira",
      acao: "alcançou 1000 pontos de fidelidade",
      hora: "2 dias atrás, 09:00",
      cor: "#9F7AEA",
      iniciais: "LP",
    },
    {
      id: 6,
      nome: "Juliana Costa",
      acao: "participou da aula de HIIT",
      hora: "2 dias atrás, 17:40",
      cor: "#4299E1",
      iniciais: "JC",
    },
  ];

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
        plugins: { legend: { labels: {} } },
        scales: {
          x: {
            ticks: {},
            grid: { color: "rgba(255,255,255,0.2)" },
          },
          y: {
            ticks: {},
            grid: { color: "rgba(255,255,255,0.2)" },
          },
        },
      },
    });

    return () => chartInstance.destroy();
  }, []);

  return (
    <div className="dashboard-admin">
      <h1>Dashboard</h1>

      {/* Cards */}
      <div className="cards-grid ">
        <div className="card">
          <span className="card-value">156</span>
          <span className="card-change positive">+12% este mês</span>
        </div>

        <div className="card">
          <span className="card-title">Desafios Ativos</span>
          <span className="card-value ">24</span>
          <span className="card-change negative">-3% este mês</span>
        </div>

        <div className="card">
          <span className="card-title">Pontos Resgatados</span>
          <span className="card-value ">12.5k</span>
          <span className="card-change positive">+18% este mês</span>
        </div>
      </div>

      {/* Gráfico + Atividade */}
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
            <button className="ver-tudo-btn" onClick={() => setShowModal(true)}>
              Ver Tudo
            </button>
          </div>
          <ul className="activity-list">
            {atividades.slice(0, 4).map((a) => (
              <li className="activity-item" key={a.id}>
                <div className="avatar" style={{ background: a.cor }}>
                  {a.iniciais}
                </div>
                <div className="activity-info">
                  <span className="name">
                    {a.nome} {a.acao}
                  </span>
                  <span className="time">{a.hora}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Atividades Recentes</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <ul className="modal-list">
              {atividades.map((a) => (
                <li className="activity-item" key={a.id}>
                  <div className="avatar" style={{ background: a.cor }}>
                    {a.iniciais}
                  </div>
                  <div className="activity-info">
                    <span className="name">
                      {a.nome} {a.acao}
                    </span>
                    <span className="time">{a.hora}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
