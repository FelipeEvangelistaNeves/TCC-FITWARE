import React from "react";
import { Bell } from "lucide-react";
import "../../styles/layout/mobHeader.scss";
import { LogOut } from "lucide-react";

export default function HeaderAluno({ title }) {

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
    <header className="header-professor py-3 px-4 border-bottom">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Título da Página */}
        <h5 className="page-title m-0">{title}</h5>

        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} /> Sair
        </button>

        {/* Ícones e Perfil */}
        <div className="d-flex align-items-center gap-3">
          {/* Notificação */}
          <button className="btn notification-btn rounded-circle">
            <Bell size={20} />
          </button>

          {/* Avatar com iniciais */}
          <div className="profile-avatar">MS</div>
        </div>
      </div>
    </header>
  );
}
