import React, { useState, useEffect } from "react";
import { Bell, LogOut, ArrowLeft } from "lucide-react";
import "../../styles/layout/mobHeader.scss";

export default function HeaderAluno({ title }) {
  const [iniciais, setIniciais] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/alunos", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Erro ao buscar dados do aluno");
        const data = await res.json();
        setIniciais(data.iniciais);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAlunos();
  }, []);

  // 🔒 Bloqueia o scroll da página principal quando o popup está aberto
  useEffect(() => {
    if (showDropdown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // limpa o efeito se o componente desmontar
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDropdown]);

  async function handleLogout() {
    try {
      const res = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) window.location.href = "/";
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  }

  return (
    <>
      <header className="header-professor py-3 px-4 border-bottom">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h5 className="page-title m-0">{title}</h5>
          <div className="d-flex align-items-center gap-3">
            <button
              className="notification-btn position-relative"
              type="button"
              onClick={() => setShowDropdown(true)}
            >
              <Bell size={20} />
            </button>

            <div className="profile-avatar">{iniciais}</div>

            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay de notificações */}
      {showDropdown && (
        <div className="notification-overlay">
          <div className="notification-header">
            <button className="back-btn" onClick={() => setShowDropdown(false)}>
              <ArrowLeft size={20} />
              <span>Voltar</span>
            </button>
            <h6>Notificações</h6>
            <button className="back-btn" onClick={() => setShowDropdown(false)}>
              <ArrowLeft size={20} />
              <span>Voltar</span>
            </button>
          </div>

          <div className="notification-list">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="notification-item">
                Notificação {i + 1} — João Paulo
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
