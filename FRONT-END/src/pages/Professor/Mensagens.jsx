export default function MensagensProf() {
  return (
    <div className="page-container">
      <header className="page-header">Mensagens</header>
      <main>
        <input
          type="text"
          placeholder="Buscar mensagem..."
          className="search-input"
        />
        <div className="message">Maria: Como está o treino?</div>
      </main>
    </div>
  );
}
