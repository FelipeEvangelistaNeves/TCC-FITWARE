import BottomNavAluno from "../../layouts/AlunoLayout/BottomNavAluno";

export default function TreinosAluno() {
  return (
    <div className="page-container">
      <header className="page-header">Treinos</header>
      <main>
        <input
          type="text"
          placeholder="Buscar treino..."
          className="search-input"
        />
        <div className="card">
          <h4>Treino de Força</h4>
          <p>3x12 Agachamento</p>
        </div>
        <div className="card">
          <h4>Treino de Cardio</h4>
          <p>20 min corrida</p>
        </div>
      </main>
      <BottomNavAluno />
    </div>
  );
}
