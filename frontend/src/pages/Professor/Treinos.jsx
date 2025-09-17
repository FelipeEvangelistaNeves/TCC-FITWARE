export default function TreinosProf() {
  return (
    <div className="page-container">
      <header className="page-header">Treinos</header>
      <main>
        <input
          type="text"
          placeholder="Buscar treino..."
          className="search-input"
        />
        <div className="card">Treino de Força</div>
        <div className="card">Treino de Cardio</div>
      </main>
    </div>
  );
}
