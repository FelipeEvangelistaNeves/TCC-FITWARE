import BottomNavAluno from "../../layouts/AlunoLayout/BottomNav";

export default function MensagensAluno() {
  return (
    <div className="page-container">
      <header className="page-header">Mensagens</header>
      <main>
        <input
          type="text"
          placeholder="Buscar mensagem..."
          className="search-input"
        />
        <div className="message">Treinador: Como foi o treino de hoje?</div>
      </main>
      <BottomNavAluno />
    </div>
  );
}
