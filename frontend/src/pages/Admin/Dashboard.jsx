import { useEffect, useState } from "react";
import "../../styles/pages/admin/dashboard.scss";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  const [cards, setCards] = useState({
    alunos: 0,
    desafios: 0,
    treinos: 0,
  });

  const [atividades, setAtividades] = useState([]);

  // Extrai a inicial do nome
  const getInitial = (nome) => {
    if (!nome) return "?";
    return nome.trim().charAt(0).toUpperCase();
  };

  // ------------------------------
  // BUSCAR DADOS DO BACKEND
  // ------------------------------
  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      // 1️⃣ Total de alunos (usando rota /admin/allAlunos que já existe)
      let alunosTotal = 0;
      const alunosRes = await fetch("http://localhost:3000/admin/allAlunos", {
        credentials: "include",
      });
      if (alunosRes.ok) {
        try {
          const alunosDataList = await alunosRes.json();
          alunosTotal = alunosDataList?.alunos?.length || 0;
        } catch (e) {
          console.warn("Não foi possível parsear /admin/allAlunos:", e);
        }
      } else {
        console.warn(
          "Erro ao buscar alunos:",
          alunosRes.status,
          alunosRes.statusText
        );
      }

      // 2️⃣ Desafios
      const desafiosRes = await fetch("http://localhost:3000/desafios", {
        credentials: "include",
      });
      let desafiosData = [];
      if (desafiosRes.ok) {
        try {
          desafiosData = await desafiosRes.json();
        } catch (e) {
          console.warn("Não foi possível parsear /desafios:", e);
        }
      }

      // 3️⃣ Treinos
      const treinosRes = await fetch("http://localhost:3000/treinos", {
        credentials: "include",
      });
      let treinosData = [];
      if (treinosRes.ok) {
        try {
          treinosData = await treinosRes.json();
        } catch (e) {
          console.warn("Não foi possível parsear /treinos:", e);
        }
      }

      // 4️⃣ Atividades Recentes (rota correta no backend: /admin/dashboard/atividades)
      const atividadesRes = await fetch(
        "http://localhost:3000/admin/dashboard/atividades",
        {
          credentials: "include",
        }
      );
      let atividadesData = { atividades: [] };
      if (atividadesRes.ok) {
        try {
          atividadesData = await atividadesRes.json();
        } catch (e) {
          console.warn(
            "Não foi possível parsear /admin/dashboard/atividades:",
            e
          );
        }
      } else {
        console.warn(
          "Erro ao buscar atividades:",
          atividadesRes.status,
          atividadesRes.statusText
        );
      }

      // Atualiza cards
      setCards({
        alunos: alunosTotal,
        desafios:
          (Array.isArray(desafiosData)
            ? desafiosData.filter(
                (d) =>
                  String(d.de_status || d.status || "").toLowerCase() ===
                  "ativo"
              ).length
            : 0) || 0,
        treinos: Array.isArray(treinosData) ? treinosData.length : 0,
      });

      // Atividades recentes: o backend retorna { atividades: [...] }
      setAtividades(
        Array.isArray(atividadesData?.atividades)
          ? atividadesData.atividades
          : []
      );
    } catch (err) {
      console.error("Erro ao carregar dashboard:", err);
    }
  }

  return (
    <div className="dashboard-admin">
      <h1>Dashboard</h1>

      {/* Cards */}
      <div className="cards-grid">
        <div className="card">
          <span className="card-title">Alunos Ativos</span>
          <span className="card-value">{cards.alunos}</span>
        </div>

        <div className="card">
          <span className="card-title">Desafios Ativos</span>
          <span className="card-value">{cards.desafios}</span>
        </div>

        <div className="card">
          <span className="card-title">Total de Treinos</span>
          <span className="card-value">{cards.treinos}</span>
        </div>
      </div>

      {/* Gráfico + Atividades */}
      <div className="content-grid">
        <div className="activity-section">
          <div className="section-header">
            <h2 className="section-title">Atividade Recente</h2>
            <button className="ver-tudo-btn" onClick={() => setShowModal(true)}>
              Ver Tudo
            </button>
          </div>

          <ul className="activity-list">
            {atividades.slice(0, 4).map((a, i) => (
              <li className="activity-item" key={i}>
                <div
                  className="avatar"
                  style={{ background: a.cor || "#7f24c6" }}
                >
                  {getInitial(a.nome)}
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

      {/* Modal */}
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
              {atividades.map((a, i) => (
                <li className="activity-item" key={i}>
                  <div
                    className="avatar"
                    style={{ background: a.cor || "#7f24c6" }}
                  >
                    {getInitial(a.nome)}
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
