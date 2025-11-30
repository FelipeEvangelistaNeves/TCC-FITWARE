import { useEffect, useState } from "react";
import "../../styles/pages/admin/dashboard.scss";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Buscar estatísticas do dashboard (rota unificada)
      const statsRes = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/dashboard/stats`,
        {
          credentials: "include",
        }
      );

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setCards({
          alunos: statsData.alunos || 0,
          desafios: statsData.desafios || 0,
          treinos: statsData.treinos || 0,
        });
      } else {
        console.error(
          "Erro ao buscar stats:",
          statsRes.status,
          statsRes.statusText
        );
        setError("Não foi possível carregar as estatísticas.");
      }

      // 2️⃣ Buscar atividades recentes
      const atividadesRes = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/dashboard/atividades
        `,
        {
          credentials: "include",
        }
      );

      if (atividadesRes.ok) {
        const atividadesData = await atividadesRes.json();
        setAtividades(
          Array.isArray(atividadesData?.atividades)
            ? atividadesData.atividades
            : []
        );
      } else {
        console.error(
          "Erro ao buscar atividades:",
          atividadesRes.status,
          atividadesRes.statusText
        );
      }
    } catch (err) {
      console.error("Erro ao carregar dashboard:", err);
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-admin">
      <h1>Dashboard</h1>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchDashboardData}>Tentar novamente</button>
        </div>
      )}

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <>
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

          <div className="content-grid">
            <div className="activity-section">
              <div className="section-header">
                <h2 className="section-title">Atividade Recente</h2>
                <button
                  className="ver-tudo-btn"
                  onClick={() => setShowModal(true)}
                  disabled={atividades.length === 0}
                >
                  Ver Tudo
                </button>
              </div>

              {atividades.length === 0 ? (
                <p className="no-activities">Nenhuma atividade recente</p>
              ) : (
                <ul className="activity-list">
                  {atividades.slice(0, 4).map((a, i) => (
                    <li className="activity-item" key={a.id || i}>
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
                        <> </>
                        <span className="time">{a.hora}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}

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
                <li className="activity-item" key={a.id || i}>
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
