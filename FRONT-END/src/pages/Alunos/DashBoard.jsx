export default function DashboardAluno() {
  return (
    <div className="page-container">
      <header className="page-header">Dashboard</header>
      <main>
        <div className="stats">
          <div className="stat-box">
            Alunos
            <br />
            <strong>42</strong>
          </div>
          <div className="stat-box">
            Treinos
            <br />
            <strong>156</strong>
          </div>
          <div className="stat-box">
            Mensagens
            <br />
            <strong>89</strong>
          </div>
        </div>
        <h3>Ações Rápidas</h3>
        <div className="quick-actions">
          <button>Alunos</button>
          <button>Treinos</button>
          <button>Mensagens</button>
          <button>Histórico</button>
        </div>
      </main>
    </div>
  );
}
