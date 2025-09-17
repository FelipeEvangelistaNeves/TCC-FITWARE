import { LogOut } from "lucide-react";

export default function PerfilAluno() {
  ////////////////// logout ///////////////////
  async function handleLogout() {
    try {
      const res = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = "/"; // redireciona pro login
      }
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  }
  return (
    <div className="page-container">
      <header className="page-header">Meu Perfil</header>
      <main>
        <div className="profile-info">
          <div className="avatar">MS</div>
          <h2>Maria Silva</h2>
          <p>Turma 3 meses</p>
        </div>
        <div className="logout">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} /> Sair
          </button>
        </div>
      </main>
    </div>
  );
}
