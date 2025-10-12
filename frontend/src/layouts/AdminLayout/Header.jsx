import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/layout/admhead.scss";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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
    <header className="admin-header">
      <div className="container-fluid">
        <div className="row align-items-center h-100">
          <div className="col-auto">
            <h1 className="header-title mb-0">FitWare Admin</h1>
          </div>

          <div className="col"></div>

          <div className="col-auto">
            <div className="user-section">
              <Link to="notificacoes" className="notification-badge-btn">
                <i className="bi bi-bell  not-adm"></i>
              </Link>

              <div
                className={`dropdown ${showDropdown ? "show" : ""}`}
                ref={dropdownRef}
              >
                <button
                  className="btn user-profile-btn"
                  type="button"
                  onClick={toggleDropdown}
                  onAbort={toggleDropdown}
                  aria-expanded={showDropdown}
                >
                  <div className="user-avatar">
                    <span>JP</span>
                  </div>
                </button>

                <ul className={`dropdown-menu  ${showDropdown ? "show" : ""}`}>
                  <li>
                    <h6 className="dropdown-header">João Paulo</h6>
                  </li>
                  <li>
                    <span className="dropdown-item-text small">
                      Administrator
                    </span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="perfil">
                      <i className="bi bi-person me-2"></i>
                      Meu Perfil
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="configuracoes">
                      <i className="bi bi-gear me-2"></i>
                      Configurações
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="notificacoes">
                      <i className="bi bi-bell me-2"></i>
                      Notificações
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Sair
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
