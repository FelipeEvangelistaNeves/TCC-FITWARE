export default function AlunosProf() {
  return (
    <div className="page-container">
      <header className="page-header">Alunos</header>
      <main>
        <input
          type="text"
          placeholder="Buscar aluno..."
          className="search-input"
        />
        <ul className="list">
          <li>Maria Silva</li>
          <li>Pedro Alves</li>
          <li>Carlos Mendes</li>
        </ul>
      </main>
    </div>
  );
}
