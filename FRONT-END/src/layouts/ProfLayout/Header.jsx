import React from "react";
import { Bell } from "lucide-react";
import "../../styles/mobHeader.scss";

export default function HeaderProfessor() {
  return (
    <header className="header-professor py-3 px-4 border-bottom">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Título da Página */}
        <h5 className="page-title m-0">Treinos</h5>

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
