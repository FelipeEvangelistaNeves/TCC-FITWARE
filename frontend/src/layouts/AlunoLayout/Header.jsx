import React, { useState, useEffect } from "react";
import { Bell, LogOut, ArrowLeft } from "lucide-react";
import "../../styles/layout/mobHeader.scss";

export default function HeaderAluno({ title }) {
  const [iniciais, setIniciais] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/aluno`, {
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

  async function handleLogout() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        localStorage.clear();
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  }

  const token = localStorage.getItem("token");

  const [avisos, setAvisos] = useState([]);
  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/avisos/allAvisos`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.success) {
          setAvisos(data.avisos);
        }
      } catch (error) {
        console.error("Erro ao buscar avisos:", error);
      }
    };
    fetchAvisos();
  }, []);

  return (
    <>
      <header className="header-professor py-3 px-4">
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
          </div>
        </div>
      </header>

      {/* Overlay de notificações */}
      {showDropdown && (
        <div className="notification-overlay">
          <div className="notification-header">
            <button className="back-btn" onClick={() => setShowDropdown(false)}>
              <ArrowLeft size={20} />
            </button>
            <h4>Notificações</h4>
          </div>

          <div className="notification-list">
            {avisos && avisos.length > 0 ? (
              avisos.map((aviso, index) => (
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
