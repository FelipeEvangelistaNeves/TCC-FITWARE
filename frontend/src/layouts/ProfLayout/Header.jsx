import React, { useState, useEffect } from "react";
import { Bell, LogOut, ArrowLeft } from "lucide-react";
import "../../styles/layout/mobHeader.scss";

export default function HeaderProfessor({ title }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [avisos, setAvisos] = useState();

  async function handleLogout() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.clear();
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  }

//   useEffect(() => {
//     const fetchAvisos = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/api/avisos/allAvisos", {
//           method: "GET",
//         });
//         const data = await res.json();
//         if (data.success) {
//           setAvisos(data.avisos);
//         }
//       } catch (error) {
//         console.error("Erro ao buscar avisos:", error);
//       }
//       };
//     fetchAvisos();
// }, [])

  return (
    <>
      <header className="header-professor py-3 px-4 border-bottom">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h5 className="page-title m-0">{title}</h5>

          <div className="d-flex align-items-center gap-3">
            <button
              className="btn notification-btn rounded-circle"
              onClick={() => setShowDropdown(true)}
            >
              <Bell size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* === Overlay de notificações === */}
      {showDropdown && (
        <div className="notification-overlay">
          <div className="notification-header">
            <button className="back-btn" onClick={() => setShowDropdown(false)}>
              <ArrowLeft size={20} />
              <span>Voltar</span>
            </button>
            <h6>Notificações</h6>
          </div>

          <div className="notification-list">
            {avisos && avisos.length > 0 ? (
              avisos.map((aviso) => (
                <div key={aviso.av_id} className="notification-item">
                  <h6 className="notification-title">
                    {aviso.av_titulo ?? "Aviso"}
                  </h6>
                  <p className="notification-body">{aviso.av_mensagem}</p>
                  {aviso.av_data_inicio && (
                    <time className="notification-time">
                      {new Date(aviso.av_data_inicio).toLocaleString()}
                    </time>
                  )}
                </div>
              ))
            ) : (
              <div className="notification-item no-notifications">
                Sem notificações
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
